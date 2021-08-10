import * as Dec from "../declaration"

const initialState: Dec.Redux.RootState["limitTemp"] = {
  value: 20,
}

export const limitTemperatureReducer = (
  state = initialState,
  action: Dec.Actions.LimitTemperature
): Dec.Redux.RootState["limitTemp"] =>
  action.type === "LIMIT_TEMP" ? { ...state, value: action.payload } : state
