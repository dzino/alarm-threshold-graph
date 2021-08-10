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
  }
}

export declare namespace Actions {
  interface Data {
    type: "DATA"
    payload: General.DataUnit
  }
  interface LimitTemperature {
    type: "LIMIT_TEMP"
    payload: General.TempUnit
  }

  type All = LimitTemperature | Data
}
