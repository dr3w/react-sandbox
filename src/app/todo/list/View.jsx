import React from 'react'
import PropTypes from 'prop-types'
import { todoShape } from 'common/store/shapes'
import { TodoList, TodoAdd } from 'components'
import withStatusHandler from 'hoc/withStatusHandler'

const TodoListEnhanced = withStatusHandler(
  { isReady: ({ isLoading }) => !isLoading('todo') }
)(TodoList)

const TodoView = ({ todos, todoToggle, todoDelete, todoAdd, isLoading }) => (
  <div className="todo-list">
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
  isLoading: PropTypes.func,
  todoAdd: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func
}

export default TodoView

