import React from 'react'
import PropTypes from 'prop-types'
import withToggle from 'hoc/withToggle'

import './Item.scss'

const TodoItem = ({ toggleTodo, deleteTodo, item, status, show, hide, toggledOn }) => (
  <li
    className={`list-group-item todo-list-item ${status.isUpdating ? 'item-updating' : ''}`}
    onMouseEnter={show}
    onMouseLeave={hide}
  >
    <button
      className={`btn btn-xs btn-danger ${toggledOn ? '' : 'hidden'}`}
      onClick={!status.isUpdating && deleteTodo}
    >
      DELETE
    </button>
    <div
      htmlFor={item.id}
      className="item-label clickable"
      onClick={!status.isUpdating && toggleTodo}
    >
      <div className={`glyphicon checkmark ${item.isDone ? 'glyphicon-check' : 'glyphicon-unchecked'}`} />
      <div className="item-text">
        {item.text}
      </div>
    </div>
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

