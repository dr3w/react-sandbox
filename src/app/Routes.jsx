import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import TodoListContainer from 'app/todo/list'
import TodoItemContainer from 'app/todo/item'

const Routes = () => (
  <Switch>
    <Redirect exact path="/" to="/todos/all" />
    <Route path="/todos/:type" component={TodoListContainer} />
    <Route path="/todo/:id" component={TodoItemContainer} />
  </Switch>
)

export default Routes
