import { INCREMENT_DUMMY } from '../common/constants'

export default function increment(state = 0, action) {
  switch (action.type) {
    case INCREMENT_DUMMY:
      return state + action.incBy || 1
    default:
      return state
  }
}
