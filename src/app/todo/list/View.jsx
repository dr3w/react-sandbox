import React from 'react'
import PropTypes from 'prop-types'
import TodoList from 'app/todo/list/List'
import TodoAdd from 'app/todo/list/Add'

const TodoView = ({ todos, setIsDoneTodo, onTodoAdd, deleteTodo }) => (
  <div>
    <div>
      <span className="status-indicator">
        {todos.status.isInitialLoad ? '▶' : ''}
      </span>
      <span>
        Initial:
      </span>
    </div>
    <div>
      <span className="status-indicator">
        {todos.status.isLoading ? '▶' : ''}
      </span>
      <span>
        Loading:
      </span>
    </div>
    <div>
      <span className="status-indicator">
        {todos.status.isUpdating ? '▶' : ''}
      </span>
      <span>
        Updating:
      </span>
    </div>
    <div>
      <span className="status-indicator">
        {todos.status.isReady ? '▶' : ''}
      </span>
      <span>
        Ready:
      </span>
    </div>

    <div>&nbsp;</div>

    <TodoList
      todos={todos.data}
      setIsDoneTodo={setIsDoneTodo}
      deleteTodo={deleteTodo}
    />
    <TodoAdd onSubmit={onTodoAdd} isUpdating={todos.status.isUpdating} />
  </div>
)

TodoView.propTypes = {
  todos: PropTypes.object,
  setIsDoneTodo: PropTypes.func,
  onTodoAdd: PropTypes.func,
  deleteTodo: PropTypes.func
}

export default TodoView

