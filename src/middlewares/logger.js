/* eslint-disable no-console */
export default store => next => (action) => {
  console.debug('STORE', 'dipatching', action)
  console.debug('STORE', 'before', Object.assign({}, store.getState()))
  next(action)
  console.debug('STORE', 'after', Object.assign({}, store.getState()))
}
/* eslint-enable no-console */

