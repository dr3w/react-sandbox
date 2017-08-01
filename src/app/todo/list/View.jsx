import React from 'react'
import PropTypes from 'prop-types'
import { todoShape } from 'common/store/shapes'
import { TodoList, TodoAdd, ErrorList } from 'components'
import withStatusHandler from 'hoc/withStatusHandler'

const TodoListEnhanced = withStatusHandler(
  { isReady: ({ isLoading }) => !isLoading('todo') }
)(TodoList)

const TodoView = ({
  todos, todoToggle, todoDelete, todoAdd, isLoading, errorCloseById, getReducerErrors
}) => (
  <div className="todo-list">
    <ErrorList
      errors={getReducerErrors('todo')}
      errorCloseById={errorCloseById}
    />
    <TodoAdd onSubmit={todoAdd} />
    <TodoListEnhanced
      isLoading={isLoading}
      todos={todos}
      todoToggle={todoToggle}
      todoDelete={todoDelete}
    />
  </div>
)

TodoView.propTypes = {
  todos: todoShape,
  getReducerErrors: PropTypes.func,
  errorCloseById: PropTypes.func,
  isLoading: PropTypes.func,
  todoAdd: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func
}

export default TodoView

