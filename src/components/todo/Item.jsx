import React from 'react'
import PropTypes from 'prop-types'
import withToggle from 'hoc/withToggle'

const TodoItem = ({ todoToggle, todoDelete, item, show, hide, toggledOn, isLoading }) => (
  <li
    className={`list-group-item todo-list-item ${isLoading ? 'item-updating' : ''}`}
    onMouseEnter={show}
    onMouseLeave={hide}
  >
    <button
      className={`btn btn-xs btn-danger ${toggledOn ? '' : 'hidden'}`}
      onClick={!isLoading && todoDelete}
    >
      DELETE
    </button>
    <div
      htmlFor={item.id}
      className="item-label clickable"
      onClick={!isLoading && todoToggle}
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
  isLoading: PropTypes.bool,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  toggledOn: PropTypes.bool
}

export default withToggle(TodoItem)

