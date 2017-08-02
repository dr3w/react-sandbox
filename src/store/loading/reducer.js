import { Map } from 'immutable'
import { API_START, API_SUCCEEDED, API_FAILED } from 'common/store/constants'
import { getReducerName, matchApiCall } from 'common/store/helpers'

const loadingReducer = (state = new Map({}), action) => {
  const { type, meta = {} } = action

  const reducerName = getReducerName(type)
  const id = meta.id || 'root'

  switch (true) {
    case matchApiCall(type, API_START):
      return state.mergeDeep({
        [reducerName]: [{ id, isLoading: true }]
      })

    case matchApiCall(type, API_SUCCEEDED):
    case matchApiCall(type, API_FAILED):
      return state.updateIn([reducerName], list => list.filter(v => v.get('id') !== id))

    default:
      return state
  }
}

export default loadingReducer
