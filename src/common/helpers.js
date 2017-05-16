import { OrderedMap } from 'immutable'

export const arrayToMap = (arr, Model) => (
  arr.reduce((acc, entity) => {
    const model = new Model(entity)
    return acc.set(entity.id, model)
  }, new OrderedMap({}))
)

export const mapToArray = immutableMap =>
  (immutableMap instanceof OrderedMap && immutableMap.valueSeq().toArray()) || []
