import TODO from './actions'

export const routeInitList = type => ({
  type: TODO.ROUTE_INIT.LIST,
  meta: { type }
})

export const fetchAllTodos = () => ({
  type: TODO.FETCH.API_REQUESTED
})

export const todoToggle = (id, isDone) => ({
  type: TODO.TOGGLE.API_REQUESTED,
  meta: { id, isDone }
})
export const todoDelete = id => ({
  type: TODO.DELETE.API_REQUESTED,
  meta: { id }
})
export const todoAdd = todo => ({
  type: TODO.ADD.API_REQUESTED,
  meta: { ...todo }
})
