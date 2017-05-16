import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { api, logger } from 'middleware/index'

import { reducer as form } from 'redux-form'
import article from 'reducers/article'

const rootReducer = combineReducers({
  form,
  article
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(api, logger))

const store = createStore(rootReducer, {}, enhancer)

// TODO: remove
window.store = store

export default store
