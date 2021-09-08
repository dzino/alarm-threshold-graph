import { put, select, fork, takeEvery } from "redux-saga/effects"
import { General, Redux } from "../declaration"
import { Update } from "./server"
import { GetStorage, SetStorage, ClearStorage } from "./localStorage"

const getStorage = new GetStorage()
const setStorage = new SetStorage()
const clearStorage = new ClearStorage()
const update = new Update()

/** ### SAGA: Watcher */
export function* sagaWatcher() {
  yield takeEvery(update.pattern, updateWorker)
  yield takeEvery(getStorage.pattern, getWorker)
  yield takeEvery(setStorage.pattern, setWorker)
  yield takeEvery(clearStorage.pattern, clearWorker)
}

/** ### SAGA: Worker */
function* updateWorker() {
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

/** ### SAGA: Worker */
function* getWorker() {
  const setLimitTemp: (v: General.TempUnit) => void = function* (v) {
    yield put({ type: "LIMIT_TEMP", payload: v })
  }
  yield fork(() => getStorage.run({ setLimitTemp })) // call/fork/spawn блокирующий/неБлокирующий
}

/** ### SAGA: Worker */
function* setWorker() {
  const limitTemp: number = yield select(
    (state: Redux.RootState) => state.limitTemp.value
  )

  yield fork(() => setStorage.run({ limitTemp })) // call/fork/spawn блокирующий/неБлокирующий
}

/** ### SAGA: Worker */
function* clearWorker() {
  yield fork(() => clearStorage.run()) // call/fork/spawn блокирующий/неБлокирующий
}
