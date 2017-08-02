import _ from 'lodash'
import { API_START, API_SUCCEEDED, API_FAILED } from 'common/store/constants'
import ERROR from './actions'

// TODO: should hold arrays in reducers

const parse = type => type.split('/')
const isApi = parsed => parsed.length === 3

const errorReducer = (state = {}, action) => {
  const { type, meta = {}, error } = action

  const newState = _.cloneDeep(state)

  const [reducer,, apiStatus] = parse(type)
  const reducerName = reducer.toLowerCase()
  const id = meta.id || 'root'

  if (type === ERROR.CLEAR_ALL) {
    return {}
  } else if (type === ERROR.CLEAR_BY_REDUCER) {
    delete newState[reducerName]
    return newState
  } else if (type === ERROR.CLEAR_BY_ID) {
    if (newState[meta.reducer] && newState[meta.reducer][meta.id]) {
      delete newState[meta.reducer][meta.id]
    }
    return newState
  } else if (isApi(parse(type))) { // handle API actions
    switch (apiStatus) {
      case API_FAILED:
        return _(newState)
          .setWith([reducerName, id], {
            message: error.message,
            stack: error.stack,
            type,
            id
          }, Object)
          .value()

      case API_START:
      case API_SUCCEEDED: {
        if (newState[reducerName] && newState[reducerName][id]) {
          delete newState[reducerName][id]
        }

        return newState
      }

      default:
        return newState
    }
  }

  return newState
}

export default errorReducer
