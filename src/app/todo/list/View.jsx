import React from 'react'
import PropTypes from 'prop-types'
import TodoList from 'app/todo/list/List'
import TodoAdd from 'app/todo/list/Add'
// import { StatusDev } from 'components'
// <StatusDev status={todos.status} />

const TodoView = ({ todos, setIsDoneTodo, onTodoAdd, deleteTodo }) => (
  <div>
    <TodoAdd onSubmit={onTodoAdd} />
    <TodoList
      todos={todos.data}
      setIsDoneTodo={setIsDoneTodo}
      deleteTodo={deleteTodo}
    />
  </div>
)

TodoView.propTypes = {
  todos: PropTypes.object,
  setIsDoneTodo: PropTypes.func,
  onTodoAdd: PropTypes.func,
  deleteTodo: PropTypes.func
}

export default TodoView

