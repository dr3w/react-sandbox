import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'
import TODO, * as todoActions from 'store/todo/actions'
import * as routeActions from 'store/route/actions'
import * as errorActions from 'store/error/actions'
import { getTodosFilteredByType } from 'store/todo/selectors'
import { getIsLoading } from 'store/loading/selectors'
import { getErrorsByReducer, getErrorsByType, getErrorsById } from 'store/error/selectors'
import TodoView from 'app/todo/list/View'

const TodoListContainer = props => <TodoView {...props} />

const mapStateToProps = state => ({
  todos: getTodosFilteredByType(state),

  getIsLoading: getIsLoading(state),
  getErrorsById: getErrorsById(state),
  getErrorsByType: getErrorsByType(state),
  getErrorsByReducer: getErrorsByReducer(state)
})

const mapDispatchToProps = {
  initRoute: routeActions.todoList,

  todoAdd: todoActions.todoAdd,
  todoToggle: todoActions.todoToggle,
  todoDelete: todoActions.todoDelete,

  errorCloseById: errorActions.errorCloseById
}

const routeOnEnter = ({ initRoute, match }) => initRoute(match.params)
const isReady = ({ todos }) => !isEmpty(todos)
const errorMessage = (props) => {
  const errors = props.getErrorsByType('todo', TODO.FETCH.API_FAILED) || []

  return errors[0] && `${errors[0].type}: ${errors[0].message}`
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouteHandler({
    routeOnEnter,
    isReady,
    errorMessage
  })
)

export default enhance(TodoListContainer)
