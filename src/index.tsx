import * as React from "react"
import ReactDOM from "react-dom"
import { compose, createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import createSagaMiddleware from "@redux-saga/core"
import { rootReducer } from "./redux/rootReducer"
import { sagaWatcher } from "./sagas"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

import App from "./views"

/**
 * # Redux
 * Chrome: Redux DevTools
 */
const saga = createSagaMiddleware()
const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? [(window as any).__REDUX_DEVTOOLS_EXTENSION__()]
  : []
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, saga), ...devTools)
)
saga.run(sagaWatcher)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
