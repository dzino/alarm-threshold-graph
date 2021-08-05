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
  interface SetLimitTemperature {
    type: "SetLimitTemperature"
    payload: Redux.RootState["limitTemperature"]["value"]
  }
  interface SetData {
    type: "SetData"
    payload: Redux.RootState["data"]["value"]
  }
}
