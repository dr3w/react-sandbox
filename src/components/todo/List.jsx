import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import { TodoItem } from 'components'

const createTodoList = ({ todos, ...props }) => todos && _map(todos, (todo) => {
  const todoToggle = () => props.todoToggle(todo.id, !todo.isDone)
  const todoDelete = () => props.todoDelete(todo.id)
  const isLoading = props.getIsLoading('todo', todo.id)
  const isError = !!props.getErrorsById('todo', todo.id).length

  return (
    <TodoItem
      key={todo.id}
      item={todo}
      isError={isError}
      isLoading={isLoading}
      todoToggle={todoToggle}
      todoDelete={todoDelete}
    />
  )
})

const TodoList = (props) => {
  const isLoading = props.getIsLoading('todo')

  return (
    <ul
      className={`list-group ${isLoading ? 'list-updating' : ''}`}
    >
      {createTodoList(props)}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.object,
  getIsLoading: PropTypes.func,
  getErrorsById: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func
}

export default TodoList

