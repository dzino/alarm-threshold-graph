export declare namespace General {
  interface DataUnit {
    temperature: number
    date: number
  }
  type TemperatureUnit = number
}

export declare namespace Redux {
  interface RootState {
    data: {
      value: General.DataUnit[]
    }
    limitTemperature: {
      value: General.TemperatureUnit
    }
  }
}

export declare namespace Actions {
  interface Data {
    type: "DATA"
    payload: General.DataUnit
  }
  interface LimitTemperature {
    type: "LIMIT_TEMPERATURE"
    payload: General.TemperatureUnit
  }

  type All = LimitTemperature | Data
}
