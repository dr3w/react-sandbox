import _ from 'lodash'
import { DefaultState } from 'common/store/defaults'
import {
  FETCH_REQUESTED, FETCH_START, FETCH_SUCCEEDED, FETCH_FAILED,
  UPDATE_REQUESTED, UPDATE_START, UPDATE_SUCCEEDED, UPDATE_FAILED,
  RESET_PREV_STATE, RESET_STATUS
} from 'common/store/constants'

/**
 * Returns a path to status object,
 * if id is provided, path points to an object in `data` collection;
 * otherwise – to a root status of reducer
 *
 * @param id
 * @returns {Array} A path to status object
 */
const statusProp = id => (id ? ['data', id, 'status'] : ['status'])

const dataProp = id => (id ? ['data', id, 'data'] : ['data'])

/**
 * Updates `status` depending on the op
 * Default reducer handlers for FETCH and UPDATE op types
 * START, SUCCEED, FAILED lifecycle handler provided for each op type
 * @type {*[]}
 */
const defaultHandlers = [{
  type: FETCH_REQUESTED
}, {
  type: UPDATE_REQUESTED
}, {
  type: RESET_STATUS,
  handler: ({ newState, meta }) => _(_.cloneDeep(newState))
    .set([...statusProp(meta.id), 'isReady'], true)
    .set([...statusProp(meta.id), 'isLoading'], false)
    .set([...statusProp(meta.id), 'isUpdating'], false)
    .set([...statusProp(meta.id), 'error'], null)
    .value()
}, {
  type: RESET_PREV_STATE,
  handler: ({ newState, meta }) => _(_.cloneDeep(newState))
    .set([...dataProp(meta.id)], newState.prevStateData)
    .set(['prevStateData'], null)
    .value()
}, {
  type: FETCH_START,
  handler: ({ newState }) => _(_.cloneDeep(newState))
    .set(['prevStateData'], _.cloneDeep(newState.data))
    .set(['status', 'isLoading'], true)
    .set(['status', 'isReady'], false)
    .set(['status', 'error'], null)
    .value()
}, {
  type: FETCH_SUCCEEDED,
  handler: ({ newState }) => _(_.cloneDeep(newState))
    .set(['status', 'isInitialLoad'], false)
    .set(['status', 'isLoading'], false)
    .set(['status', 'isReady'], true)
    .value()
}, {
  type: FETCH_FAILED,
  handler: ({ newState, error }) => _(_.cloneDeep(newState))
    .set(['status', 'isLoading'], false)
    .set(['status', 'isReady'], true)
    .set(['status', 'error'], error)
    .value()
}, {
  type: UPDATE_START,
  handler: ({ newState, meta }) => _(_.cloneDeep(newState))
    .set(['prevStateData'], _.cloneDeep(_.get(newState, [...dataProp(meta.id)])))
    .set([...statusProp(meta.id), 'isUpdating'], true)
    .set([...statusProp(meta.id), 'isReady'], false)
    .set([...statusProp(meta.id), 'error'], null)
    .value()
}, {
  type: UPDATE_SUCCEEDED,
  handler: ({ newState, meta }) => _(_.cloneDeep(newState))
    .set([...statusProp(meta.id), 'isInitialLoad'], false)
    .set([...statusProp(meta.id), 'isUpdating'], false)
    .set([...statusProp(meta.id), 'isReady'], true)
    .value()
}, {
  type: UPDATE_FAILED,
  handler: ({ newState, meta, error }) => _(_.cloneDeep(newState))
    .set([...statusProp(meta.id), 'isUpdating'], false)
    .set([...statusProp(meta.id), 'isReady'], true)
    .set([...statusProp(meta.id), 'error'], error)
    .set(['status', 'error'], error)
    .value()
}]

const createActions = (prefixes = []) =>
  _.reduce(prefixes, (a, prefix) =>
      _.reduce(defaultHandlers, (actionsAcc, { type }) =>
        _.set(actionsAcc, [prefix, type], `${prefix}/${type}`), a || {})
    , {})

const createHandlers = (prefixes = []) =>
  _.reduce(prefixes, (a, prefix) =>
      _.reduce(defaultHandlers, (actionsAcc, { type, handler }) =>
        _.set(actionsAcc, [prefix, type], handler), a || {})
    , {})

const createReducer = (prefixes) => {
  const actions = createActions(prefixes)
  const handlers = createHandlers(prefixes)

  const reducer = (state = new DefaultState({}), action) => {
    const { type, payload, error, meta } = action

    let newState = _.cloneDeep(state)

    const handler = _.get(handlers, [...type.split('/')])

    if (handler) {
      newState = handler({ newState, payload, error, meta })
    }

    return newState
  }

  return { actions, reducer }
}

export default createReducer
