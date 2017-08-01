import _get from 'lodash/get'
import _reduce from 'lodash/reduce'

export const getReducerErrors = state => reducer =>
  _reduce(_get(state, ['error', reducer]), (acc, errorObj) => {
    acc.push(errorObj)
    return acc
  }, [])

export const getEntityError = state => (reducer, id) => _get(state, ['error', reducer, id])
