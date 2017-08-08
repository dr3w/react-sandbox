import { Map } from 'immutable'
import ROUTE from './actions'

const routeReducer = (state = Map({}), action) => {
  const { type, meta = {} } = action

  switch (type) {
    case ROUTE.REDIRECT:
      return state.set('redirectTo', meta.redirectTo)

    case ROUTE.REDIRECTED:
      return state.set('redirectTo', null)

    default:
      return state
  }
}

export default routeReducer
