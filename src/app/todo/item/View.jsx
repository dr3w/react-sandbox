import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'
import { todoShape } from 'common/shapes'
import { TodoList, ErrorList } from 'components'
import withStatusHandler from 'hoc/withStatusHandler'

const TodoListEnhanced = withStatusHandler({
  isReady: ({ todos }) => !_isEmpty(todos)
})(TodoList)

const TodoListView = (props) => {
  const {
    todos, getIsLoading, getErrorsById, getErrorsByReducer,
    errorCloseById, todoToggle, todoDelete
  } = props

  return (
    <div className="todo-item-container">
      <ErrorList
        errors={getErrorsByReducer('todo')}
        errorCloseById={errorCloseById}
      />

      <Link to="/todos/all" className="todo-btn-back btn btn-default">Back</Link>

      <TodoListEnhanced
        todos={todos}
        getErrorsById={getErrorsById}
        getIsLoading={getIsLoading}
        todoToggle={todoToggle}
        todoDelete={todoDelete}
        redirectTo="/todos/all"
        isView
      />
    </div>
  )
}

TodoListView.propTypes = {
  todos: todoShape,
  isView: PropTypes.bool,
  redirectTo: PropTypes.string,
  getErrorsById: PropTypes.func,
  getErrorsByReducer: PropTypes.func,
  errorCloseById: PropTypes.func,
  getIsLoading: PropTypes.func,
  todoAdd: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func
}

export default TodoListView

