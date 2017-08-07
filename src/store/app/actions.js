const APP = {}

APP.SET_TYPE = 'APP/SET_TYPE'
APP.SET_TODO_ID = 'APP/SET_TODO_ID'

export default APP

export const setTodoType = type => ({
  type: APP.SET_TYPE,
  meta: { type }
})

export const setTodoId = id => ({
  type: APP.SET_TODO_ID,
  meta: { id }
})
