import React from 'react'
import PropTypes from 'prop-types'
import { todoShape } from 'common/shapes'
import { TodoList, TodoAdd, StatusDev } from 'components'
import withStatusHandler from 'hoc/withStatusHandler'

const TodoListEnhanced = withStatusHandler(
  { isReady: ({ todosStatus }) => todosStatus && todosStatus.isReady }
)(TodoList)

const TodoView = ({ todos, todosStatus, setIsDoneTodo, onTodoAdd, deleteTodo }) => (
  <div>
    <StatusDev status={todosStatus} />
    <TodoAdd onSubmit={onTodoAdd} />
    <TodoListEnhanced
      todos={todos}
      todosStatus={todosStatus}
      setIsDoneTodo={setIsDoneTodo}
      deleteTodo={deleteTodo}
    />
  </div>
)

TodoView.propTypes = {
  todos: todoShape,
  todosStatus: PropTypes.object,
  setIsDoneTodo: PropTypes.func,
  onTodoAdd: PropTypes.func,
  deleteTodo: PropTypes.func
}

export default TodoView

