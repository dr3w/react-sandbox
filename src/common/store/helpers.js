import { OrderedMap } from 'immutable'

export const arrayToMap = (arr, Model) =>
  arr.reduce((acc, entity) => acc.set(entity.id, new Model(entity)), new OrderedMap({}))

export const mapToArray = immutableMap => immutableMap.valueSeq().toArray()

export const matchApiCall = (type, apiLifecycle) => type.split('/')[2] === apiLifecycle

export const getReducerName = type => type.split('/')[0].toLowerCase()
