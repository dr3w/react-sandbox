import { combineReducers } from 'redux'
import articles from 'app/articles/reducer'
import articlesId from 'app/articles/id/reducer'
import dummies from 'dummies/reducer'

export default combineReducers({
  articles,
  articlesId,
  dummies
})
