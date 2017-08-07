import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withToggle from 'hoc/withToggle'

const TodoItem = ({ todoToggle, todoDelete, item, show, hide, toggledOn, isLoading, isError }) => {
  const liClassName = ['list-group-item', 'todo-list-item']
  if (isLoading) liClassName.push('item-updating')
  if (isError) liClassName.push('item-error')

  return (
    <li
      className={liClassName.join(' ')}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        className={`btn btn-xs btn-danger ${toggledOn ? '' : 'hidden'}`}
        onClick={!isLoading && todoDelete}
      >
        DELETE
      </button>
      <Link
        className={`btn btn-xs btn-primary ${toggledOn ? '' : 'hidden'}`}
        to={`/todo/${item.id}`}
      >
        VIEW
      </Link>

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
}

TodoItem.propTypes = {
  item: PropTypes.object,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  toggledOn: PropTypes.bool
}

export default withToggle(TodoItem)

