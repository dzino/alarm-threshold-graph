import * as Dec from "../declaration"

const initialState: Dec.Redux.RootState["data"] = {
  value: [],
}

export const dataReducer = (
  state = initialState,
  action: Dec.Actions.List["data"]
): Dec.Redux.RootState["data"] => {
  switch (action.type) {
    case "DATA":
      return { ...state, value: [...state.value, action.payload] }
    default:
      return state
  }
}
