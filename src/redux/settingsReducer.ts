import * as Dec from "../declaration"

const initialState: Dec.Redux.RootState["settings"] = {
  host: "192.168.43.100",
  port: 8080,
  graphLength: 120,
  clear: 3000,
  timeout: 5000,
}

export const settingsReducer = (
  state = initialState
): Dec.Redux.RootState["settings"] => state
