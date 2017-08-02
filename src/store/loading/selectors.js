import { List } from 'immutable'

export const getIsLoading = state => (reducer, id = 'root') =>
  state.loading
    .get(reducer, List())
    .find(v => v.get('id') === id, null, List())
    .get('isLoading')
