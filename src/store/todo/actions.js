import { actions } from 'store/todo'

const { TODOS, TODOS_ADD, TODOS_TOGGLE, TODOS_DELETE } = actions

export const initListRoute = type => ({
  type: TODOS.INIT_LIST_ROUTE,
  meta: {
    type
  }
})

export const fetchTodos = () => ({
  type: TODOS.FETCH_REQUESTED
})

export const resetStatus = id => ({
  type: TODOS.RESET_STATUS,
  meta: { id }
})

export const setTodoType = type => ({
  type: TODOS.SET_TYPE,
  meta: {
    type
  }
})

export const addTodo = data => ({
  type: TODOS_ADD.UPDATE_REQUESTED,
  meta: {
    ...data
  }
})

export const setIsDoneTodo = (id, isDone) => ({
  type: TODOS_TOGGLE.UPDATE_REQUESTED,
  meta: {
    id,
    isDone
  }
})

export const deleteTodo = id => ({
  type: TODOS_DELETE.UPDATE_REQUESTED,
  meta: {
    id
  }
})
