import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withToggle from 'hoc/withToggle'

const TodoItem = (props) => {
  const { redirectTo, todo, show, hide, toggledOn, isView } = props

  const todoToggle = () => props.todoToggle(todo.id, !todo.isDone)
  const todoDelete = () => props.todoDelete(todo.id, redirectTo)
  const isLoading = props.getIsLoading('todo', todo.id)
  const isError = !!props.getErrorsById('todo', todo.id).length

  const liClassName = ['todo-list-item']
  if (isLoading) liClassName.push('item-updating')
  if (isError) liClassName.push('item-error')

  const viewLink = !isView &&
    <Link
      className={`btn btn-xs btn-primary ${toggledOn ? '' : 'hidden'}`}
      to={`/todo/${todo.id}`}
    >
      VIEW
    </Link>

  return (
    <div
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

      {viewLink}

      <div
        htmlFor={todo.id}
        className="item-label clickable"
        onClick={!isLoading && todoToggle}
      >
        <div className={`glyphicon checkmark ${todo.isDone ? 'glyphicon-check' : 'glyphicon-unchecked'}`} />
        <div className="item-text">
          {todo.text}
        </div>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  isView: PropTypes.bool,
  redirectTo: PropTypes.string,
  getErrorsById: PropTypes.func,
  getIsLoading: PropTypes.func,
  todoToggle: PropTypes.func,
  todoDelete: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  toggledOn: PropTypes.bool
}

export default withToggle(TodoItem)

