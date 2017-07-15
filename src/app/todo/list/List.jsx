import React from 'react'
import _map from 'lodash/map'

const createTodoList = ({ todos, ...props }) =>
todos && _map(todos, (({ data, status }) => {
  if (!data) return null

  const toggleTodo = () => props.setIsDoneTodo(data.id, !data.isDone)
  const deleteTodo = () => props.deleteTodo(data.id)

  return (
    <li className="list-group-item" key={data.id}>
      <input
        type="checkbox"
        id={data.id}
        className="checkbox checkbox-inline"
        disabled={status.isUpdating}
        checked={data.isDone}
        readOnly="true"
        onClick={toggleTodo}
      />
      <span> &nbsp; </span>
      <label
        htmlFor={data.id}
        className="clickable"
        onClick={toggleTodo}
      >
        {data.text}
      </label>
      <button
        className="btn btn-xs btn-danger pull-right"
        onClick={deleteTodo}
      >
        X
      </button>
    </li>
  )
}))

const TodoList = props => (
  <ul className="list-group checked-list-box">
    {createTodoList(props)}
  </ul>
)

export default TodoList

