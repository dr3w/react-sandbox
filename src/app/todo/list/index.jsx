import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'
import * as actions from 'store/todo/actions'
import { initialLoadData, isReady, errorMessage } from 'app/todo/list/logic'
import { getTodos, getTodosFilteredByType, getTodosStatus } from 'store/todo/selectors'
import TodoView from 'app/todo/list/View'

const TodoListContainer = props => <TodoView {...props} />

const mapStateToProps = state => ({
  allTodos: getTodos(state),
  todos: getTodosFilteredByType(state),
  todosStatus: getTodosStatus(state)
})

const mapDispatchToProps = dispatch => ({
  initListRoute: type => dispatch(actions.initListRoute(type)),
  setIsDoneTodo: (...args) => dispatch(actions.setIsDoneTodo(...args)),
  deleteTodo: (...args) => dispatch(actions.deleteTodo(...args)),
  onTodoAdd: data => dispatch(actions.addTodo(data))
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
