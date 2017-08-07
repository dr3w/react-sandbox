import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'
import TODO, * as todoActions from 'store/todo/actions'
import * as routeActions from 'store/route/actions'
import * as errorActions from 'store/error/actions'
import { getTodoById } from 'store/todo/selectors'
import { getIsLoading } from 'store/loading/selectors'
import { getErrorsByReducer, getErrorsByType, getErrorsById } from 'store/error/selectors'
import TodoItemView from 'app/todo/item/View'

const TodoItemContainer = props => <TodoItemView {...props} />

const mapStateToProps = state => ({
  todo: getTodoById(state),

  getIsLoading: getIsLoading(state),
  getErrorsById: getErrorsById(state),
  getErrorsByType: getErrorsByType(state),
  getErrorsByReducer: getErrorsByReducer(state)
})

const mapDispatchToProps = {
  initRoute: routeActions.todoItem,

  todoAdd: todoActions.todoAdd,
  todoToggle: todoActions.todoToggle,
  todoDelete: todoActions.todoDelete,

  errorCloseById: errorActions.errorCloseById
}

const routeOnEnter = ({ initRoute, match }) => initRoute(match.params)
const isReady = ({ todo }) => !_isEmpty(todo)
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

export default enhance(TodoItemContainer)
