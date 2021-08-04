import * as React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

import App from "./views"

/**
 * # Version TypeScript
 *
 * To get rid of ESlint underscores - use *TypeScript React* *4.3.2*
 * In *VScode* toggle in the bottom bar
 * PS: This version is not currently available in this editor.
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
