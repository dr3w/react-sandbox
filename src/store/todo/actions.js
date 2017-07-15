import {
  TODOS, TODOS_TOGGLE, TODOS_ADD, TODOS_DELETE,
  FETCH_REQUESTED, UPDATE_REQUESTED
} from 'common/constants'

export const fetchTodos = type => () => ({
  type: `${TODOS}_${FETCH_REQUESTED}`,
  meta: {
    type
  }
})

export const addTodo = data => ({
  type: `${TODOS_ADD}_${UPDATE_REQUESTED}`,
  meta: {
    ...data
  }
})

export const setIsDoneTodo = type => (id, isDone) => ({
  type: `${TODOS_TOGGLE}_${UPDATE_REQUESTED}`,
  meta: {
    id,
    type,
    isDone
  }
})

export const deleteTodo = type => id => ({
  type: `${TODOS_DELETE}_${UPDATE_REQUESTED}`,
  meta: {
    id,
    type
  }
})
