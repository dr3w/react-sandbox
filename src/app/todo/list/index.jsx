import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'
import * as actions from 'store/todo/actions'
import { getTodos, getTodosStatus } from 'store/todo/selectors'

import TodoView from 'app/todo/list/View'

const TodoListContainer = props => <TodoView {...props} />

const initialLoadData = ({ fetchTodos, setTodoType, match }) => {
  const type = match.params.type

  setTodoType(type)
  fetchTodos()
}

const isReady = ({ todos }) => todos
const errorMessage = () => false // todosStatus.error

const mapStateToProps = state => ({
  todos: getTodos(state),
  todosStatus: getTodosStatus(state)
})

const mapDispatchToProps = dispatch => ({
  setTodoType: type => dispatch(actions.setTodoType(type)),
  fetchTodos: () => dispatch(actions.fetchTodos()),
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
