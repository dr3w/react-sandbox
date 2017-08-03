import { Map } from 'immutable'
import APP from './actions'

const appReducer = (state = Map({}), action) => {
  const { type, meta = {} } = action

  switch (type) {
    case APP.SET_TYPE:
      return state.set('type', meta.type)

    default:
      return state
  }
}

export default appReducer
