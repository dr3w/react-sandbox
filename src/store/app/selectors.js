import _get from 'lodash/get'

export const getTodoType = state => _get(state, ['app', 'type'])
