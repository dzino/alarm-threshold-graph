export declare namespace General {
  interface DataUnit {
    temperature: number
    date: number
  }

  type TempUnit = number

  declare class Action {
    pattern: Readonly<Actions.Type>
    run(params: Object): void
  }
}

export declare namespace Redux {
  interface RootState {
    data: {
      value: General.DataUnit[]
    }
    limitTemp: {
      value: General.TempUnit
    }
    settings: {
      host: string
      port: number
      graphLength: number
      clear: number
      timeout: number
    }
  }

  type Reducers = { [key in keyof RootState]: any }
}

export declare namespace Actions {
  interface List {
    data: {
      type: "DATA"
      payload: General.DataUnit
    }
    limitTemp: {
      type: "LIMIT_TEMP" // SET_LOCAL
      payload: General.TempUnit
    }
    update: { type: "UPDATE" }
    getLocal: { type: "GET_LOCAL" }
    clearLocal: { type: "CLEAR_LOCAL" }
  }

  type All = List[keyof List]
  type Type = List[keyof List]["type"]
}
