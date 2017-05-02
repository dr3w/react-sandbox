import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoMatch from 'no-match/NoMatch'
import App from 'root/App'

export default (
  <Router>
    <Switch>
      <Route exact path="/404" component={NoMatch} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
)
