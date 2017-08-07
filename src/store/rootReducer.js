import { combineReducers } from 'redux'

import { reducer as form } from 'redux-form'
import error from 'store/error/reducer'
import loading from 'store/loading/reducer'
import app from 'store/app/reducer'
import todo from 'store/todo/reducer'

export default combineReducers({
  error,
  loading,
  form,
  app,
  todo
})
