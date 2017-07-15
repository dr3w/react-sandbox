import _ from 'lodash'
import createReducer, { normalizeResponseCollection } from 'common/createReducer'
import {
  TODOS, TODOS_ADD, TODOS_TOGGLE, TODOS_DELETE,
  FETCH_SUCCEEDED, UPDATE_SUCCEEDED
} from 'common/constants'

export default createReducer(
  {
    name: TODOS,
    handlers: [{
      typePostfix: FETCH_SUCCEEDED,
      handler: (state, payload) => ({ ...state, data: normalizeResponseCollection(payload) })
    }]
  },
  {
    name: TODOS_DELETE,
    handlers: [{
      typePostfix: UPDATE_SUCCEEDED,
      handler: (state, payload, error, meta) => {
        const newStateData = _({ ...state.data }).omit(meta.id).value()

        return { ...state, data: newStateData }
      }
    }]
  },
  { name: TODOS_ADD },
  { name: TODOS_TOGGLE }
)
