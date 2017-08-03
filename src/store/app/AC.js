import APP from './actions'

export const initRouteList = meta => ({
  type: APP.ROUTE.LIST,
  meta
})

export const setTodoType = type => ({
  type: APP.SET_TYPE,
  meta: { type }
})
