import { combineReducers } from 'redux'
import articles from '../articles/reducer'
import dummies from '../dummies/reducer'

export default combineReducers({
  articles,
  dummies
})
