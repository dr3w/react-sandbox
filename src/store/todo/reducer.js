import { OrderedMap, Record } from 'immutable'
import { arrayToMap } from 'common/store/helpers'
import TODO from './actions'

const TodoModel = Record({
  id: null,
  isDone: null,
  text: null
})

const todoReducer = (state = new OrderedMap({}), action) => {
  const { type, payload, meta } = action

  switch (type) {
    case TODO.FETCH.API_SUCCEEDED:
      return new OrderedMap(arrayToMap(payload.reverse(), TodoModel))

    case TODO.TOGGLE.API_SUCCEEDED:
      return state
        .setIn([meta.id, 'isDone'], meta.isDone)

    case TODO.DELETE.API_SUCCEEDED:
      return state
        .filter(value => value.get('id') !== meta.id)

    default:
      return state
  }
}

export default todoReducer
