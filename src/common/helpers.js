import { OrderedMap } from 'immutable'
import _get from 'lodash/get'
import _find from 'lodash/find'

export const arrayToMap = (arr = [], Model) => (
  arr.reduce((acc, entity) => {
    const model = new Model(entity)
    return acc.set(entity.id, model)
  }, new OrderedMap({}))
)

export const mapToArray = immutableMap =>
  (immutableMap instanceof OrderedMap && immutableMap.valueSeq().toArray()) || null

export const onStart = (state, entityId) => state
  .setIn([entityId, 'data'], null)
  .setIn([entityId, 'status', 'loading'], true)
  .setIn([entityId, 'status', 'loaded'], false)
  .setIn([entityId, 'status', 'error'], null)

export const onSuccess = (state, entityId, data) => state
  .setIn([entityId, 'data'], data)
  .setIn([entityId, 'status', 'loading'], false)
  .setIn([entityId, 'status', 'loaded'], true)
  .setIn([entityId, 'status', 'error'], null)

export const onFailure = (state, entityId, error) => state
  .setIn([entityId, 'data'], null)
  .setIn([entityId, 'status', 'loading'], false)
  .setIn([entityId, 'status', 'loaded'], true)
  .setIn([entityId, 'status', 'error'], error)

export const isStatusPristine = (status = {}) => {
  const { loading, loaded, error } = status

  return !error && !loading && !loaded
}

export const shouldFetch = (force, data, status) => (
  force || (!data && isStatusPristine(status))
)

export const isReady = statuses => statuses.every(s => s && s.loaded)
export const errorMessage = statuses => _get(_find(statuses, s => s && s.error), ['error', 'message'])
