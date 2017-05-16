import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import article from 'app/article/reducer'

export default combineReducers({
  form,
  article
})
