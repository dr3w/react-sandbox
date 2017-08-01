import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import { TodoItem } from 'components'

const createTodoList = ({ todos, ...props }) => todos && _map(todos, (todo) => {
  const todoToggle = () => props.todoToggle(todo.id, !todo.isDone)
  const todoDelete = () => props.todoDelete(todo.id)
  const isItemLoading = props.isLoading('todo', todo.id)

  return (
    <TodoItem
      key={todo.id}
      item={todo}
      isLoading={isItemLoading}
      todoToggle={todoToggle}
      todoDelete={todoDelete}
    />
  )
})

const TodoList = props => (
  <ul
    className={`list-group ${props.isLoading('todo') ? 'list-updating' : ''}`}
  >
    {createTodoList(props)}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.object,
  isLoading: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func
}

export default TodoList

