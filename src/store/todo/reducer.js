import _ from 'lodash'
import TODO from './actions'

const todoReducer = (state = {}, action) => {
  const { type, payload, meta } = action
  const newState = _.cloneDeep(state)

  switch (type) {
    case TODO.FETCH.API_SUCCEEDED:
      return payload.reverse().reduce((acc, item) => {
        acc[item.id] = item
        return acc
      }, {})

    case TODO.TOGGLE.API_SUCCEEDED:
      return _(newState)
        .set([meta.id, 'isDone'], meta.isDone)
        .value()

    case TODO.DELETE.API_SUCCEEDED: {
      delete newState[meta.id]
      return newState
    }

    default:
      return state
  }
}

export default todoReducer
