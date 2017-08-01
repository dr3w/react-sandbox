import _ from 'lodash'

const defaultActionTypes = ['API_REQUESTED', 'API_START', 'API_SUCCEEDED', 'API_FAILED']

/**
 *
 * @param {String} reducerName As passed to combineReducers
 * @param {Array} prefixes Operation prefixes
 */
const createActions = (reducerName, prefixes = []) =>
  _.reduce(prefixes, (a, prefix) =>
      _.reduce(defaultActionTypes, (actionsAcc, type) =>
        _.set(actionsAcc, [prefix, type], `${reducerName.toUpperCase()}/${prefix}/${type}`), a || {})
    , {})

export default createActions

