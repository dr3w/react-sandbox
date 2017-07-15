import {
  TODOS, TODOS_TOGGLE, TODOS_ADD, TODOS_DELETE, SET_TYPE,
  FETCH_REQUESTED, UPDATE_REQUESTED
} from 'common/constants'

export const setTodoType = type => ({
  type: `${TODOS}_${SET_TYPE}`,
  meta: {
    type
  }
})

export const fetchTodos = () => ({
  type: `${TODOS}_${FETCH_REQUESTED}`
})

export const addTodo = data => ({
  type: `${TODOS_ADD}_${UPDATE_REQUESTED}`,
  meta: {
    ...data
  }
})

export const setIsDoneTodo = (id, isDone) => ({
  type: `${TODOS_TOGGLE}_${UPDATE_REQUESTED}`,
  meta: {
    id,
    isDone
  }
})

export const deleteTodo = id => ({
  type: `${TODOS_DELETE}_${UPDATE_REQUESTED}`,
  meta: {
    id
  }
})
