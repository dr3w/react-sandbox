import { actions } from 'store/todo'

const { TODOS, TODOS_ADD, TODOS_TOGGLE, TODOS_DELETE } = actions

export const fetchTodos = () => ({
  type: TODOS.FETCH_REQUESTED
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
