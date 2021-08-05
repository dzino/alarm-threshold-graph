import * as Dec from "../declaration"

const initialState: Dec.Redux.RootState["data"] = {
  value: [],
}

export const dataReducer = (
  state = initialState,
  action: Dec.Actions.SetData
): Dec.Redux.RootState["data"] => state
