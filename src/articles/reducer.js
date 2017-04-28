import { INCREMENT } from '../common/constants'

export default function increment(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + (action.incBy || 1)
    default:
      return state
  }
}
