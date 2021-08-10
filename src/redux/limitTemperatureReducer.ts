import * as Dec from "../declaration"

const initialState: Dec.Redux.RootState["limitTemperature"] = {
  value: 20,
}

export const limitTemperatureReducer = (
  state = initialState,
  action: Dec.Actions.LimitTemperature
): Dec.Redux.RootState["limitTemperature"] =>
  action.type === "LIMIT_TEMPERATURE"
    ? { ...state, value: action.payload }
    : state
