import createApiActions from 'common/store/createApiActions'

const TODO = createApiActions('TODO', ['FETCH', 'TOGGLE', 'ADD', 'DELETE'])

TODO.SET_TYPE = 'TODO/SET_TYPE'

export default TODO

export const fetchAllTodos = () => ({
  type: TODO.FETCH.API_REQUESTED
})

export const todoToggle = (id, isDone) => ({
  type: TODO.TOGGLE.API_REQUESTED,
  meta: { id, isDone }
})

export const todoDelete = (id, redirectTo) => ({
  type: TODO.DELETE.API_REQUESTED,
  meta: { id, redirectTo }
})

export const todoAdd = todo => ({
  type: TODO.ADD.API_REQUESTED,
  meta: { ...todo }
})
