import { combineReducers } from 'redux'

import { reducer as form } from 'redux-form'
import todo from 'store/todo/reducer'

export default combineReducers({
  form,
  todo
})
