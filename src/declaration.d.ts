export declare namespace General {
  interface DataUnit {
    temperature: number
    date: number
  }
}

export declare namespace Redux {
  interface RootState {
    data: {
      value: General.DataUnit[]
    }
    limitTemperature: {
      value: number
    }
  }
}

export declare namespace Actions {
  interface LimitTemperature {
    type: "LIMIT_TEMPERATURE"
    payload: Redux.RootState["limitTemperature"]["value"]
  }
  interface Data {
    type: "DATA"
    payload: Redux.RootState["data"]["value"]
  }

  type All = LimitTemperature | Data
}
