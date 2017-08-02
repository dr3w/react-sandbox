import { List } from 'immutable'

export const getReducerErrors = state => reducer => state.error.get(reducer, List()).toJS()
