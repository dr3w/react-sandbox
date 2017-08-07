const ERROR = {}

ERROR.CLEAR_ALL = 'ERROR/CLEAR_ALL'
ERROR.CLEAR_BY_REDUCER = 'ERROR/CLEAR_BY_REDUCER'
ERROR.CLEAR_BY_ID = 'ERROR/CLEAR_BY_ID'

export default ERROR

export const errorClearAll = () => ({ type: ERROR.CLEAR_ALL })

export const errorCloseById = (reducer, id) => ({
  type: ERROR.CLEAR_BY_ID,
  meta: {
    reducer, id
  }
})
