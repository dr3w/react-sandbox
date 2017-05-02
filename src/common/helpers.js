import { OrderedMap } from 'immutable'
import { LOADED, LOADING, FAILED, ERROR_GENERIC } from 'common/constants'

export const arrayToMap = (arr, Model) => (
  arr.reduce((acc, entity) => {
    const model = new Model(entity)
    return acc.set(entity.id, model)
  }, new OrderedMap({}))
)

export const mapToArray = immutableMap => immutableMap.valueSeq().toArray()

export const onApiStart = stateRecord => (
  stateRecord
    .set('error', null)
    .set('status', LOADING)
)

export const onApiSuccess = stateRecord => (
  stateRecord
    .set('error', null)
    .set('status', LOADED)
)

export const onApiFail = (stateRecord, error) => (
  stateRecord
    .set('error', (error && error.message) || ERROR_GENERIC)
    .set('status', FAILED)
)
