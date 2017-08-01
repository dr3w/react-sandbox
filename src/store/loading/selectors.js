import _get from 'lodash/get'

export const getIsLoading = state => (reducer, id = 'root') => _get(state, ['loading', reducer, id])
