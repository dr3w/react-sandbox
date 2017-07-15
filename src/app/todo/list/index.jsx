import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'
import * as actions from 'store/todo/actions'
import { getTodos } from 'store/todo/selectors'

import TodoView from 'app/todo/list/View'

const TodoListContainer = props => <TodoView {...props} />

const initialLoadData = ({ fetchTodos }) => {
  fetchTodos()
}

const isReady = ({ todos }) => todos.data
const errorMessage = ({ todos }) => todos.status.error

const mapStateToProps = state => ({
  todos: getTodos(state)
})

const mapDispatchToProps = (dispatch, { match }) => {
  const type = match.params.type

  return {
    fetchTodos: () => dispatch(actions.fetchTodos(type)()),
    setIsDoneTodo: (...args) => dispatch(actions.setIsDoneTodo(type)(...args)),
    deleteTodo: (...args) => dispatch(actions.deleteTodo(type)(...args)),
    onTodoAdd: data => dispatch(actions.addTodo(data))
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouteHandler({
    initialLoadData,
    isReady,
    errorMessage
  })
)

export default enhance(TodoListContainer)
