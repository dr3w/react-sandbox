import { createStore, applyMiddleware, compose } from 'redux'

import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import rootReducer from 'store/rootReducer'
import rootSaga from 'store/rootSaga'

const loggerMiddleware = createLogger({
  collapsed: true,
  predicate: () => false // do not show logs
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(
  sagaMiddleware,
  loggerMiddleware
))

const store = createStore(rootReducer, {}, enhancer)

sagaMiddleware.run(rootSaga)

// TODO: remove
window.store = store

export default store
