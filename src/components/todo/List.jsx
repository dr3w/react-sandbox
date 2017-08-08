import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import { TodoItem } from 'components'

const createTodoList = ({
  todos, getIsLoading, getErrorsById, todoToggle, todoDelete, isView, redirectTo
}) =>
  todos && _map(todos, todo => (
    <li className="list-group-item" key={todo.id}>
      <TodoItem
        todo={todo}
        getIsLoading={getIsLoading}
        getErrorsById={getErrorsById}
        todoToggle={todoToggle}
        todoDelete={todoDelete}
        isView={isView}
        redirectTo={redirectTo}
      />
    </li>
  ))

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
  isView: PropTypes.bool,
  redirectTo: PropTypes.string,
  getIsLoading: PropTypes.func,
  getErrorsById: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func
}

export default TodoList

