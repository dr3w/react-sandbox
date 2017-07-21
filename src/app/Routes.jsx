import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import TodoListContainer from 'app/todo/list'

const Routes = () => (
  <Switch>
    <Redirect exact path="/" to="/todos/all" />
    <Route path="/todos/:type" component={TodoListContainer} />
  </Switch>
)

export default Routes
