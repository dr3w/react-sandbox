import _ from 'lodash'
import createReducer, { normalizeResponseCollection } from 'common/createReducer'
import * as c from 'common/constants'
import { TODOS, TODOS_DELETE } from 'store/todo/actions'

window.TODOS = TODOS
export default createReducer(
  {
    name: c.TODOS,
    handlers: [{
      type: TODOS.SET_TYPE,
      handler: (state, payload, error, meta) =>
        ({ ...state, meta: ({ ...state.meta, type: meta.type }) })
    }, {
      type: TODOS.FETCH_SUCCEEDED,
      handler: (state, payload) => ({ ...state, data: normalizeResponseCollection(payload) })
    }]
  },
  {
    name: c.TODOS_DELETE,
    handlers: [{
      type: TODOS_DELETE.UPDATE_SUCCEEDED,
      handler: (state, payload, error, meta) => {
        const newStateData = _({ ...state.data }).omit(meta.id).value()

        return { ...state, data: newStateData }
      }
    }]
  },
  { name: c.TODOS_ADD },
  { name: c.TODOS_TOGGLE }
)
