import React from 'react'
import PropTypes from 'prop-types'
import withToggle from 'hoc/withToggle'

import './Item.scss'

const TodoItem = ({ toggleTodo, deleteTodo, item, show, hide, toggledOn }) => (
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
    <span className={`glyphicon checkmark ${item.isDone ? 'glyphicon-check' : 'glyphicon-unchecked'}`} />
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

