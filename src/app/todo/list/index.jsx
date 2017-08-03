import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'
import TODO from 'store/todo/actions'
import * as routeAC from 'store/route/AC'
import * as todoAC from 'store/todo/AC'
import * as errorAC from 'store/error/AC'
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
  initRoute: routeAC.todoList,

  todoAdd: todoAC.todoAdd,
  todoToggle: todoAC.todoToggle,
  todoDelete: todoAC.todoDelete,

  errorCloseById: errorAC.errorCloseById
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
