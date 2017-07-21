import _get from 'lodash/get'

export const getTodosStatus = state => _get(state, ['todo', 'status'])
export const getTodos = state => _get(state, ['todo', 'data'])
export const getTodosType = state => _get(state, ['todo', 'meta', 'type'])
