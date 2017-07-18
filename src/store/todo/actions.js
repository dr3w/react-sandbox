import * as c from 'common/constants'
import { createActionTypes } from 'common/createReducer'

export const TODOS = createActionTypes(c.TODOS, [c.SET_TYPE])
export const TODOS_ADD = createActionTypes(c.TODOS_ADD)
export const TODOS_TOGGLE = createActionTypes(c.TODOS_TOGGLE)
export const TODOS_DELETE = createActionTypes(c.TODOS_DELETE)

export const setTodoType = type => ({
  type: TODOS.SET_TYPE,
  meta: {
    type
  }
})

export const fetchTodos = () => ({
  type: TODOS.FETCH_REQUESTED
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
