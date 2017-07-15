import _ from 'lodash'
import {
  FETCH_REQUESTED, FETCH_START, FETCH_SUCCEEDED, FETCH_FAILED,
  UPDATE_REQUESTED, UPDATE_START, UPDATE_SUCCEEDED, UPDATE_FAILED
} from 'common/constants'

class DefaultStatus {
  constructor() {
    this.isReady = true
    this.isInitialLoad = true
    this.isLoading = false
    this.isUpdating = false
    this.error = null
  }
}

class DefaultState {
  constructor({ data = null }) {
    this.status = new DefaultStatus()
    this.data = data
    this.meta = {}
  }
}

export const createActionNames = reducerName => ({
  FETCH_REQUESTED: `${reducerName}_${FETCH_REQUESTED}`,
  FETCH_START: `${reducerName}_${FETCH_START}`,
  FETCH_SUCCEEDED: `${reducerName}_${FETCH_SUCCEEDED}`,
  FETCH_FAILED: `${reducerName}_${FETCH_FAILED}`,

  UPDATE_REQUESTED: `${reducerName}_${UPDATE_REQUESTED}`,
  UPDATE_START: `${reducerName}_${UPDATE_START}`,
  UPDATE_SUCCEEDED: `${reducerName}_${UPDATE_SUCCEEDED}`,
  UPDATE_FAILED: `${reducerName}_${UPDATE_FAILED}`
})

export const normalizeResponseCollection = (payload) => {
  const p = _.isArray(payload) ? payload : [payload]

  return p.reduce((acc, data) => {
    acc[data.id || 0] = new DefaultState({ data })

    return acc
  }, {})
}

/**
 * Returns a path to status object,
 * if id is provided, path points to an object in `data` collection;
 * otherwise – to a root status of reducer
 *
 * @param id
 * @returns {Array} A path to status object
 */
const statusProps = id => (id ? ['data', id, 'status'] : ['status'])

/**
 * Updates `status` depending on the op
 * Default reducer handlers for FETCH and UPDATE op types
 * START, SUCCEED, FAILED lifecycle handler provided for each op type
 * @type {*[]}
 */
const reducerHandlers = [{
  typePostfix: FETCH_START,
  handler: newState => _({ ...newState })
    .set(['status', 'isLoading'], true)
    .set(['status', 'isReady'], false)
    .set(['status', 'error'], null)
    .value()
}, {
  typePostfix: FETCH_SUCCEEDED,
  handler: newState => _({ ...newState })
    .set(['status', 'isInitialLoad'], false)
    .set(['status', 'isLoading'], false)
    .set(['status', 'isReady'], true)
    .value()
}, {
  typePostfix: FETCH_FAILED,
  handler: (newState, payload, error) => _({ ...newState })
    .set(['status', 'isLoading'], false)
    .set(['status', 'isReady'], true)
    .set(['status', 'error'], error)
    .value()
}, {
  typePostfix: UPDATE_START,
  handler: (newState, payload, error, meta) => _({ ...newState })
    .set([...statusProps(meta.id), 'isUpdating'], true)
    .set([...statusProps(meta.id), 'isReady'], false)
    .set([...statusProps(meta.id), 'error'], null)
    .value()
}, {
  typePostfix: UPDATE_SUCCEEDED,
  handler: (newState, payload, error, meta) => _({ ...newState })
    .set([...statusProps(meta.id), 'isInitialLoad'], false)
    .set([...statusProps(meta.id), 'isUpdating'], false)
    .set([...statusProps(meta.id), 'isReady'], true)
    .value()
}, {
  typePostfix: UPDATE_FAILED,
  handler: (newState, payload, error, meta) => _({ ...newState })
    .set([...statusProps(meta.id), 'isUpdating'], false)
    .set([...statusProps(meta.id), 'isReady'], true)
    .set([...statusProps(meta.id), 'error'], error)
    .value()
}]

const getHandler = (type, name, handlers) => {
  const typePostfix = type.replace(`${name}_`, '')
  const handlerObject = _.find(handlers, ['typePostfix', typePostfix]) || {}

  return handlerObject.handler
}

const createReducer = (...actions) => (state = new DefaultState({}), action) => {
  const { type, payload, error, meta } = action

  let newState = { ...state }

  actions.forEach(({ name, handlers = {} }) => {
    const defaultHandler = getHandler(type, name, reducerHandlers)
    const customHandler = getHandler(type, name, handlers)

    if (typeof defaultHandler === 'function') {
      newState = defaultHandler(newState, payload, error, meta)
    }

    if (typeof customHandler === 'function') {
      newState = customHandler(newState, payload, error, meta)
    }
  })

  return newState
}

export default createReducer
