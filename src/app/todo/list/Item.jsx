import React from 'react'
import PropTypes from 'prop-types'
import withToggle from 'hoc/withToggle'

const TodoItem = ({ toggleTodo, deleteTodo, item, status, show, hide, toggledOn }) => (
  <li
    className="list-group-item todo-list-item"
    onMouseEnter={show}
    onMouseLeave={hide}
  >
    <button
      className={`btn btn-xs btn-danger pull-right ${toggledOn ? '' : 'hidden'}`}
      onClick={deleteTodo}
    >
      DELETE
    </button>
    <input
      type="checkbox"
      id={item.id}
      className="checkbox checkbox-inline"
      disabled={status.isUpdating}
      checked={item.isDone}
      readOnly="true"
      onClick={toggleTodo}
    />
    <label
      htmlFor={item.id}
      className="clickable"
      onClick={toggleTodo}
    >
      {item.text}
    </label>
  </li>
)

TodoItem.propTypes = {
  item: PropTypes.object,
  status: PropTypes.object,
  toggleTodo: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  toggledOn: PropTypes.bool,
  deleteTodo: PropTypes.func
}

export default withToggle(TodoItem)

