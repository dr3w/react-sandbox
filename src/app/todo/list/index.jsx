import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'
import * as AC from 'store/todo/AC'
import * as errorAC from 'store/error/AC'
import { initialLoadData, isReady, errorMessage } from 'app/todo/list/logic'
import { getTodosFilteredByType } from 'store/todo/selectors'
import { getIsLoading } from 'store/loading/selectors'
import { getErrorsByReducer, getErrorsByType, getErrorsById } from 'store/error/selectors'
import TodoView from 'app/todo/list/View'

const TodoListContainer = props => <TodoView {...props} />

const mapStateToProps = state => ({
  getErrorsById: getErrorsById(state),
  getErrorsByType: getErrorsByType(state),
  getErrorsByReducer: getErrorsByReducer(state),
  getIsLoading: getIsLoading(state),
  todos: getTodosFilteredByType(state)
})

const mapDispatchToProps = ({
  routeInitList: AC.routeInitList,
  todoToggle: AC.todoToggle,
  todoDelete: AC.todoDelete,
  todoAdd: AC.todoAdd,
  errorCloseById: errorAC.errorCloseById
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouteHandler({
    initialLoadData,
    isReady,
    errorMessage
  })
)

export default enhance(TodoListContainer)
