import { handle } from 'redux-pack'
import callAPI from 'common/api'
import { Map, Record } from 'immutable'
import {
  onStart, onSuccess, onFailure, arrayToMap, mapToArray, shouldFetch
} from 'common/helpers'

const FETCH_LIST = 'FETCH_LIST'

const ListModel = Record({
  id: null,
  title: null
})

const DefaultReducerState = Map
const entityId = 0

const listReducer = (state = new DefaultReducerState({}), action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_LIST:
      return handle(state, action, {
        start: prevState => onStart(prevState, entityId),
        success: prevState => onSuccess(prevState, entityId, arrayToMap(payload, ListModel)),
        failure: prevState => onFailure(prevState, entityId, payload)
      })

    default:
      return state
  }
}

export default listReducer

// SELECTORS
export const getList = (state) => {
  const list = state.list.getIn([entityId, 'data'])

  return list && mapToArray(list)
}

export const getListStatus = (state) => {
  const status = state.list.getIn([entityId, 'status'])

  return status && status.toJS()
}

// ACTIONS
const fetchList = () => ({
  type: FETCH_LIST,
  promise: callAPI('/api/article')
})

const checkAndFetchList = force => (dispatch, getState) => {
  const state = getState()
  const list = getList(state)
  const status = getListStatus(state)

  if (shouldFetch(force, list, status)) {
    dispatch(fetchList())
  }
}

export const listActions = {
  checkAndFetchList
}
