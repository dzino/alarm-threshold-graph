export declare namespace General {
  interface DataUnit {
    temperature: number
    date: number
  }
  type TempUnit = number
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
      type: "LIMIT_TEMP"
      payload: General.TempUnit
    }
    update: {
      type: "UPDATE"
    }
  }

  type All = List[keyof List]
  type Type = List[keyof List]["type"]
}
