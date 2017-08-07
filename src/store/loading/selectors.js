import { List } from 'immutable'

export const getIsLoading = state => (reducer, id = 'root') =>
  state.loading
    .find(v => v.get('id') === id && v.get('reducer') === reducer, null, List())
    .get('isLoading')
