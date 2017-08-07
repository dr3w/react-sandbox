import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withStatusHandler from 'hoc/withStatusHandler'
import TODO, * as todoActions from 'store/todo/actions'
import { getTodoById } from 'store/todo/selectors'
import { routeContainerShape } from 'common/shapes'
import TodoItemView from 'app/todo/item/View'

const TodoItemContainer = props => <TodoItemView {...props} />

const mapStateToProps = state => ({
  todo: getTodoById(state)
})

const mapDispatchToProps = {
  todoAdd: todoActions.todoAdd,
  todoToggle: todoActions.todoToggle,
  todoDelete: todoActions.todoDelete
}

const isReady = ({ todo }) => !_isEmpty(todo)
const errorMessage = (props) => {
  const errors = props.getErrorsByType('todo', TODO.FETCH.API_FAILED) || []

  return errors[0] && `${errors[0].type}: ${errors[0].message}`
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStatusHandler({
    isReady,
    errorMessage
  })
)

TodoItemContainer.propTypes = routeContainerShape

export default enhance(TodoItemContainer)
