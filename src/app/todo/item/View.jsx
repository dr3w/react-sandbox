import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'
import { todoShape } from 'common/shapes'
import { TodoItem, ErrorList } from 'components'
import withStatusHandler from 'hoc/withStatusHandler'

const TodoItemEnhanced = withStatusHandler({
  isReady: ({ item }) => !_isEmpty(item)
})(TodoItem)

const TodoListView = (props) => {
  const { todo } = props

  const todoToggle = () => props.todoToggle(todo.id, !todo.isDone)
  const todoDelete = () => props.todoDelete(todo.id)
  const isLoading = props.getIsLoading('todo', todo.id)
  const isError = !!props.getErrorsById('todo', todo.id).length

  return (
    <div className="todo-item-container">
      <ErrorList
        errors={props.getErrorsByReducer('todo')}
        errorCloseById={props.errorCloseById}
      />

      <Link to="/todos/all" className="todo-btn-back btn btn-default">Back</Link>

      <TodoItemEnhanced
        key={todo.id}
        item={todo}
        isError={isError}
        isLoading={isLoading}
        todoToggle={todoToggle}
        todoDelete={todoDelete}
      />
    </div>
  )
}

TodoListView.propTypes = {
  todo: todoShape,
  getErrorsById: PropTypes.func,
  getErrorsByReducer: PropTypes.func,
  errorCloseById: PropTypes.func,
  getIsLoading: PropTypes.func,
  todoAdd: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func
}

export default TodoListView

