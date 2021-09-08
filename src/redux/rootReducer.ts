import { Redux } from "../declaration"
import { combineReducers } from "redux"
import { limitTemperatureReducer } from "./limitTemperatureReducer"
import { dataReducer } from "./dataReducer"
import { settingsReducer } from "./settingsReducer"

const reducers: Redux.Reducers = {
  limitTemp: limitTemperatureReducer,
  data: dataReducer,
  settings: settingsReducer,
}

export const rootReducer = combineReducers(reducers)
