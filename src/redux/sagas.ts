import { put, select, fork, takeEvery } from "redux-saga/effects"
import { General, Redux, Actions } from "../declaration"
import dateFormat from "dateformat"

class Tools {
  __DEV__ = process.env.NODE_ENV !== "production"

  get dateID(): number {
    return +dateFormat(new Date(), "yyyymmddHHMMssl")
  }

  getRandomInt(max: number, previousNumber: number): number {
    const up: boolean = Boolean(Math.round(Math.random()))
    const checkMax: boolean = previousNumber === max
    const checkMin: boolean = previousNumber === 0
    return up && !checkMax
      ? ++previousNumber
      : !up && !checkMin
      ? --previousNumber
      : previousNumber
  }
}

declare class Action {
  pattern: Readonly<Actions.Type>
  run(params: Object): void
}

class Update implements Action {
  pattern: Readonly<Actions.Type> = "UPDATE"
  private tools = new Tools()
  private data: General.DataUnit[] | null = null
  private setData: ((v: General.DataUnit) => void) | null = null
  private host: string | null = null
  private port: number | null = null

  run(params: {
    host: string
    port: number
    data: General.DataUnit[]
    setData: (v: General.DataUnit) => void
  }) {
    this.port = params.port
    this.host = params.host
    this.data = params.data
    this.setData = params.setData
    if (this.tools.__DEV__) return this.emulator()
    this.server()
  }

  private *emulator() {
    if (!this.data || !this.setData) return
    const convert: General.DataUnit = {
      temperature: this.tools.getRandomInt(
        50,
        this.data[this.data.length - 1]?.temperature || 20
      ),
      date: this.tools.dateID,
    }
    yield this.setData(convert)
  }

  /** Server request */
  private async *server() {
    if (!this.setData || !this.host || !this.port) return
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    const response = await fetch(
      `http://${this.host}:${this.port}/`,
      requestOptions
    )
    const lastUnit: { temperature: number } = await response.json()
    const convert: General.DataUnit = {
      ...lastUnit,
      date: this.tools.dateID,
    }
    yield this.setData(convert)
  }
}

const update = new Update()

/** ### SAGA: Watcher */
export function* sagaWatcher() {
  yield takeEvery(update.pattern, sagaWorker)
}

/** ### SAGA: Worker */
function* sagaWorker() {
  const [data, setData]: [General.DataUnit[], (v: General.DataUnit) => void] = [
    yield select((state: Redux.RootState) => state.data.value),
    function* (v) {
      yield put({ type: "DATA", payload: v })
    },
  ]
  const { host, port } = yield select(
    (state: Redux.RootState) => state.settings
  )
  yield fork(() => update.run({ host, port, data, setData })) // call/fork/spawn блокирующий/неБлокирующий
}
