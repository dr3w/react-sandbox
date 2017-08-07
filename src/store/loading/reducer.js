import { Map, List } from 'immutable'
import { API_START, API_SUCCEEDED, API_FAILED } from 'common/store/constants'
import { getReducerNameFromType, matchApiCall } from 'common/store/helpers'

const loadingReducer = (state = List(), action) => {
  const { type, meta = {} } = action

  const reducerName = meta.reducer || getReducerNameFromType(type)
  const id = meta.id || 'root'

  switch (true) {
    case matchApiCall(type, API_START):
      return state.push(Map({
        isLoading: true,
        key: `${id}_${type}`,
        reducer: reducerName,
        type,
        id
      }))

    case matchApiCall(type, API_SUCCEEDED):
    case matchApiCall(type, API_FAILED):
      return state.filter(v => !(v.get('id') === id && v.get('reducer') === reducerName))

    default:
      return state
  }
}

export default loadingReducer
