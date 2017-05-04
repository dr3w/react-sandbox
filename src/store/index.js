import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer'
import { api, logger } from '../middlewares'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(api, logger))

const store = createStore(rootReducer, {}, enhancer)

// TODO: remove
window.store = store

export default store
