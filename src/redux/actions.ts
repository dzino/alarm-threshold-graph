import * as Dec from "../declaration"

export function setLimitTemperature(v: number): any {
  return (dispatch: (v: Dec.Actions.SetLimitTemperature) => void) =>
    dispatch({
      type: "SetLimitTemperature",
      payload: v,
    })
}
