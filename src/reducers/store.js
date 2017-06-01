import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { middleware as reduxPackMiddleware } from 'redux-pack'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { reducer as form } from 'redux-form'
import list from 'reducers/list'
import article from 'reducers/article'
import comment from 'reducers/comment'

const rootReducer = combineReducers({
  form,
  list,
  article,
  comment
})

const loggerMiddleware = createLogger({
  collapsed: true
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(
  reduxPackMiddleware,
  thunkMiddleware,
  loggerMiddleware
))

const store = createStore(rootReducer, {}, enhancer)

// TODO: remove
window.store = store

export default store
