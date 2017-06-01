import { handle } from 'redux-pack'
import callAPI from 'common/api'
import { Record, OrderedMap } from 'immutable'
import {
  arrayToMap, mapToArray, StatusMap,
  onStart, onSuccess, onFailure, isStatusPristine
} from 'common/helpers'

const FETCH_LIST = 'FETCH_LIST'

const ListModel = Record({
  id: null,
  title: null
})

const DefaultReducerState = Record({
  data: new OrderedMap({}),
  status: new StatusMap({})
})

const listReducer = (state = new DefaultReducerState({}), action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_LIST:
      return handle(state, action, {
        start: onStart,
        success: prevState => onSuccess(prevState, arrayToMap(payload, ListModel)),
        failure: prevState => onFailure(prevState, payload)
      })

    default:
      return state
  }
}

export default listReducer

// SELECTORS
export const getList = state => mapToArray(state.list.get('data'))
export const getListsStatus = state => state.list.get('status').toJS()

// ACTIONS
const fetchList = () => ({
  type: FETCH_LIST,
  promise: callAPI('/api/article')
})

export const listActions = {
  checkAndFetchList: articleId => (dispatch, getState) => {
    const state = getState()
    const status = getListsStatus(state)

    if (isStatusPristine(status)) {
      dispatch(fetchList(articleId))
    }
  }
}

