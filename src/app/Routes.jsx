import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Route, Redirect, Switch } from 'react-router-dom'
import withRouteOnEnter from 'hoc/withRouteOnEnter'
import { getIsLoading } from 'store/loading/selectors'
import { getErrorsByReducer, getErrorsByType, getErrorsById } from 'store/error/selectors'
import * as errorActions from 'store/error/actions'
import * as routeActions from 'store/route/actions'

import TodoListContainer from 'app/todo/list'
import TodoItemContainer from 'app/todo/item'

const mapStateToProps = state => ({
  getIsLoading: getIsLoading(state),
  getErrorsById: getErrorsById(state),
  getErrorsByType: getErrorsByType(state),
  getErrorsByReducer: getErrorsByReducer(state)
})

const createMapDispatchToProps = routeAction => ({
  initRoute: routeAction,
  errorCloseById: errorActions.errorCloseById
})

// TODO: store router params in redux store?
const routeOnEnter = ({ initRoute, match }) => initRoute(match.params)

const enhance = routeAction => compose(
  connect(mapStateToProps, createMapDispatchToProps(routeAction)),
  withRouteOnEnter(routeOnEnter)
)

const Routes = () => (
  <Switch>
    <Redirect exact path="/" to="/todos/all" />
    <Route path="/todos/:type" component={enhance(routeActions.todoList)(TodoListContainer)} />
    <Route path="/todo/:id" component={enhance(routeActions.todoItem)(TodoItemContainer)} />
  </Switch>
)

export default Routes

