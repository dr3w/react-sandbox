const APP = {}

APP.SET_TYPE = 'APP/SET_TYPE'

export default APP

export const setTodoType = type => ({
  type: APP.SET_TYPE,
  meta: { type }
})

