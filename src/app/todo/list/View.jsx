import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { todoShape } from 'common/shapes'
import { TodoList, TodoAdd, ErrorList } from 'components'
import withStatusHandler from 'hoc/withStatusHandler'

const TodoListEnhanced = withStatusHandler({
  isReady: ({ todos }) => !_isEmpty(todos)
})(TodoList)

const TodoListView = ({
  todos, todoToggle, todoDelete, todoAdd, getIsLoading,
  errorCloseById, getErrorsByReducer, getErrorsById
}) => (
  <div className="todo-list-container">
    <ErrorList
      errors={getErrorsByReducer('todo')}
      errorCloseById={errorCloseById}
    />
    <TodoAdd onSubmit={todoAdd} />
    <TodoListEnhanced
      getErrorsById={getErrorsById}
      getIsLoading={getIsLoading}
      todos={todos}
      todoToggle={todoToggle}
      todoDelete={todoDelete}
    />
  </div>
)

TodoListView.propTypes = {
  todos: todoShape,
  getErrorsByReducer: PropTypes.func,
  getErrorsById: PropTypes.func,
  errorCloseById: PropTypes.func,
  getIsLoading: PropTypes.func,
  todoAdd: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func
}

export default TodoListView

