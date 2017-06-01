import { OrderedMap, Map } from 'immutable'

export const arrayToMap = (arr = [], Model) => (
  arr.reduce((acc, entity) => {
    const model = new Model(entity)
    return acc.set(entity.id, model)
  }, new OrderedMap({}))
)

export const mapToArray = immutableMap =>
  (immutableMap instanceof OrderedMap && immutableMap.valueSeq().toArray()) || null

export const onStart = state => state
  .setIn(['status', 'loading'], true)
  .setIn(['status', 'loaded'], false)
  .setIn(['status', 'error'], null)

export const onSuccess = (state, data) => state
  .set('data', data)
  .setIn(['status', 'loading'], false)
  .setIn(['status', 'loaded'], true)
  .setIn(['status', 'error'], null)

export const onFailure = (state, error) => state
  .set('data', null)
  .setIn(['status', 'loading'], false)
  .setIn(['status', 'loaded'], false)
  .setIn(['status', 'error'], error)

export const onInvalidate = state => state
  .set('data', null)
  .setIn(['status', 'loading'], false)
  .setIn(['status', 'loaded'], false)
  .setIn(['status', 'error'], null)

export class StatusMap extends Map {
  constructor(data) {
    super(Object.assign({}, data, {
      loading: false,
      loaded: false,
      error: null
    }))
  }
}

export const isStatusPristine = ({ loading, loaded, error }) => (
  !error && !loading && !loaded
)
