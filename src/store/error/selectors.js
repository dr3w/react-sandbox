import { List } from 'immutable'

const getErrorsByReducerMap = state => reducer =>
  (state.error && state.error.filter(v => v.get('reducer') === reducer)) || List()

export const getErrorsByReducer = state => reducer => getErrorsByReducerMap(state)(reducer).toJS()

export const getErrorsByType = state => (reducer, type) =>
  getErrorsByReducerMap(state)(reducer).filter(v => v.get('type') === type).toJS()

export const getErrorsById = state => (reducer, id) =>
  getErrorsByReducerMap(state)(reducer).filter(v => v.get('id') === id).toJS()
