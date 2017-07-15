import React from 'react'
import TodoList from 'app/todo/list/List'
import TodoAdd from 'app/todo/list/Add'

const TodoView = ({ todos, setIsDoneTodo, onTodoAdd, deleteTodo }) => {
  return (
    <div>
      <div>
        Initial: {`${todos.status.isInitialLoad ? '∆' : ''}`}
      </div>
      <div>
        Loading: {`${todos.status.isLoading ? '∆' : ''}`}
      </div>
      <div>
        Updating: {`${todos.status.isUpdating ? '∆' : ''}`}
      </div>
      <div>
        Ready: {`${todos.status.isReady ? '∆' : ''}`}
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
}

export default TodoView

