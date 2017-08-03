import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'
import TODO from 'store/todo/actions'
import * as AC from 'store/todo/AC'
import * as appAC from 'store/app/AC'
import * as errorAC from 'store/error/AC'
import { getTodosFilteredByType } from 'store/todo/selectors'
import { getIsLoading } from 'store/loading/selectors'
import { getErrorsByReducer, getErrorsByType, getErrorsById } from 'store/error/selectors'
import TodoView from 'app/todo/list/View'

const TodoListContainer = props => <TodoView {...props} />

const mapStateToProps = state => ({
  todos: getTodosFilteredByType(state),
  getErrorsById: getErrorsById(state),
  getErrorsByType: getErrorsByType(state),
  getErrorsByReducer: getErrorsByReducer(state),
  getIsLoading: getIsLoading(state)
})

const mapDispatchToProps = ({
  initRouteList: appAC.initRouteList,
  todoToggle: AC.todoToggle,
  todoDelete: AC.todoDelete,
  todoAdd: AC.todoAdd,
  errorCloseById: errorAC.errorCloseById
})

const initialLoadData = ({ initRouteList, match }) => initRouteList({ type: match.params.type })
const isReady = () => true
const errorMessage = (props) => {
  const errors = props.getErrorsByType('todo', TODO.FETCH.API_FAILED) || []

  return errors[0] && `${errors[0].type}: ${errors[0].message}`
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouteHandler({
    initialLoadData,
    isReady,
    errorMessage
  })
)

export default enhance(TodoListContainer)
