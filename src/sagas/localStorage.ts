import { General, Actions } from "../declaration"

abstract class LocalStorage {
  private key: string = "limitTemp"

  protected get get() {
    return +(localStorage.getItem(this.key) || 0)
  }

  protected set(limitTemp: number) {
    localStorage.setItem(this.key, JSON.stringify(limitTemp))
  }

  protected clear() {
    localStorage.setItem(this.key, JSON.stringify(0))
  }
}

export class GetStorage extends LocalStorage implements General.Action {
  pattern: Readonly<Actions.Type> = "GET_LOCAL"
  run = (params: { setLimitTemp: (v: number) => void }) =>
    params.setLimitTemp(this.get)
}

export class SetStorage extends LocalStorage implements General.Action {
  pattern: Readonly<Actions.Type> = "LIMIT_TEMP"
  run = (params: { limitTemp: number }) => this.set(params.limitTemp)
}

export class ClearStorage extends LocalStorage implements General.Action {
  pattern: Readonly<Actions.Type> = "CLEAR_LOCAL"
  run = () => this.clear()
}
