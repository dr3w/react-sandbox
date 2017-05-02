import { combineReducers } from 'redux'
import articles from '../articles/reducer'
import articlesId from '../articles/id/reducer'
import dummies from '../dummies/reducer'

export default combineReducers({
  articles,
  articlesId,
  dummies
})
