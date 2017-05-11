import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import articles from 'app/articles/reducer'
import articleView from 'app/articles/view/reducer'
import articleComments from 'app/articles/view/comments/reducer'
import dummies from 'dummies/reducer'

export default combineReducers({
  form,
  articles,
  articleView,
  articleComments,
  dummies
})
