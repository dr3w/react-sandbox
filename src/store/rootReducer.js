import { combineReducers } from 'redux'
import articles from 'app/articles/reducer'
import articleView from 'app/articles/view/reducer'
import articleComments from 'app/articles/comments/reducer'
import dummies from 'dummies/reducer'

export default combineReducers({
  articles,
  articleView,
  articleComments,
  dummies
})
