import _ from 'lodash'

const parse = type => type.split('/')
const isApi = parsed => parsed.length === 3

const loadingReducer = (state = {}, action) => {
  const { type, meta = {} } = action

  if (!isApi(parse(type))) return state

  const newState = _.cloneDeep(state)
  const [reducer,, apiStatus] = parse(type)
  const reducerName = reducer.toLowerCase()
  const id = meta.id || 'root'

  switch (apiStatus) {
    case 'API_START':
      return _(newState)
        .setWith([reducerName, id], true, Object)
        .value()

    case 'API_SUCCEEDED':
    case 'API_FAILED': {
      delete newState[reducerName][id]
      return newState
    }

    default:
      return newState
  }
}

export default loadingReducer
