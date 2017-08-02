import { Map, List } from 'immutable'
import { API_START, API_SUCCEEDED, API_FAILED } from 'common/store/constants'
import { getReducerNameFromType, matchApiCall } from 'common/store/helpers'
import ERROR from './actions'

const errorReducer = (state = new Map({}), action) => {
  const { type, error, meta = {} } = action

  const reducerName = meta.reducer || getReducerNameFromType(type)
  const id = meta.id || 'root'

  switch (true) {
    case matchApiCall(type, API_FAILED):
      return state.updateIn([reducerName], List(), list => list
        .push(new Map({
          message: error.message,
          stack: error.stack,
          key: `${id}_${type}`,
          reducer: reducerName,
          type,
          id
        }))
      )

    case matchApiCall(type, API_START):
    case matchApiCall(type, API_SUCCEEDED):
    case type === ERROR.CLEAR_BY_ID:
      return state.updateIn([reducerName], List(), list => list.filter(v => v.get('id') !== id))

    case type === ERROR.CLEAR_BY_REDUCER:
      return state.filter((v, key) => key !== reducerName)

    case type === ERROR.CLEAR_ALL:
      return new Map()

    default:
      return state
  }
}

export default errorReducer

