import _isEmpty from 'lodash/isEmpty'

export const initialLoadData = ({ allTodos, fetchTodos, setTodoType, resetStatus, match }) => {
  const type = match.params.type

  resetStatus()
  setTodoType(type)

  if (_isEmpty(allTodos)) fetchTodos()
}

export const isReady = ({ todos }) => todos
export const errorMessage = () => false // todosStatus.error
