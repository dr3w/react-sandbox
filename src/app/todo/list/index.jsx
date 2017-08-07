import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withStatusHandler from 'hoc/withStatusHandler'
import TODO, * as todoActions from 'store/todo/actions'
import { getTodosFilteredByType } from 'store/todo/selectors'
import { routeContainerShape } from 'common/shapes'
import TodoListView from 'app/todo/list/View'

const TodoListContainer = props => <TodoListView {...props} />

const mapStateToProps = state => ({
  todos: getTodosFilteredByType(state)
})

const mapDispatchToProps = {
  todoAdd: todoActions.todoAdd,
  todoToggle: todoActions.todoToggle,
  todoDelete: todoActions.todoDelete
}

const isReady = ({ todos }) => !_isEmpty(todos)
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

TodoListContainer.propTypes = routeContainerShape

export default enhance(TodoListContainer)
