import _ from 'lodash'
import { actions, reducer } from 'store/todo'
import { normalizeResponseCollection } from 'common/store/createReducer'

const { TODOS, TODOS_TOGGLE, TODOS_DELETE } = actions

const todoReducer = (state, action) => {
  const { type, payload, meta } = action

  const newState = reducer(state, action)

  switch (type) {
    case TODOS.SET_TYPE:
      return _(_.cloneDeep(newState))
        .set(['meta', 'type'], meta.type)
        .value()

    case TODOS.FETCH_SUCCEEDED:
      return _(_.cloneDeep(newState))
        .set(['data'], normalizeResponseCollection(payload.reverse()))
        .value()

    case TODOS_TOGGLE.UPDATE_START:
      return _(_.cloneDeep(newState))
        .set(['data', meta.id, 'data', 'isDone'], meta.isDone)
        .value()

    case TODOS_DELETE.UPDATE_START:
      return _(_.cloneDeep(newState))
        .set(['data', meta.id], null)
        .value()

    default:
      return newState
  }
}

export default todoReducer
