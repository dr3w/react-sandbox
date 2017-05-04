/* eslint-disable no-console */
export default store => next => (action) => {
  console.debug('STORE', 'dispatching', action)
  console.debug('STORE', 'before', Object.assign({}, store.getState()))
  next(action)
  console.debug('STORE', 'after', Object.assign({}, store.getState()))
  console.debug('----')
}
/* eslint-enable no-console */

