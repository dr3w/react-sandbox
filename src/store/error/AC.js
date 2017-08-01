import ERROR from './actions'

export const errorClearAll = () => ({ type: ERROR.CLEAR_ALL })
export const errorCloseById = (reducer, id) => ({
  type: ERROR.CLEAR_BY_ID,
  meta: {
    reducer, id
  }
})
