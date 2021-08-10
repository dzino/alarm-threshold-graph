import { combineReducers } from "redux"
import { limitTemperatureReducer } from "./limitTemperatureReducer"
import { dataReducer } from "./dataReducer"

export const rootReducer = combineReducers({
  limitTemp: limitTemperatureReducer,
  data: dataReducer,
})
