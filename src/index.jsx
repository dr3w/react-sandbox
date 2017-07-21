import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store/store'
import App from 'app/App'

/*
 * APP entry point, all connections go here
 */
ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
), document.getElementById('app'))
