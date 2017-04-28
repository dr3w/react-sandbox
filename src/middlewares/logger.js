/* eslint-disable no-console */
export default store => next => (action) => {
  console.debug('before', store.getState())
  console.debug('---', 'dipatching', action)
  next(action)
  console.debug('after', store.getState())
}
/* eslint-enable no-console */

