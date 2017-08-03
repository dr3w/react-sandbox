import APP from './actions'

export const setTodoType = type => ({
  type: APP.SET_TYPE,
  meta: { type }
})
