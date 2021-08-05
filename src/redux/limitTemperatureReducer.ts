import * as Dec from "../declaration"

const initialState: Dec.Redux.RootState["limitTemperature"] = {
  value: 20,
}

export const limitTemperatureReducer = (
  state = initialState,
  action: Dec.Actions.SetLimitTemperature
): Dec.Redux.RootState["limitTemperature"] =>
  action.type === "SetLimitTemperature"
    ? { ...state, value: action.payload }
    : state
