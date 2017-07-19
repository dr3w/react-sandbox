import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import { TodoItem } from 'components'

const createTodoList = ({ todos, ...props }) => todos && _map(todos, (({ data, status }) => {
  if (!data) return null

  const toggleTodo = () => props.setIsDoneTodo(data.id, !data.isDone)
  const deleteTodo = () => props.deleteTodo(data.id)

  return (
    <TodoItem
      key={data.id}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
      item={data}
      status={status}
    />
  )
}))

const TodoList = props => (
  <ul className="list-group">
    {createTodoList(props)}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.object,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func
}

export default TodoList

