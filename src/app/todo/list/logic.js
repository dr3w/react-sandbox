import TODO from 'store/todo/actions'

export const initialLoadData = ({ routeInitList, match }) => routeInitList(match.params.type)
export const isReady = () => true
export const errorMessage = ({ getErrorsByType }) => {
  const errors = getErrorsByType('todo', TODO.FETCH.API_FAILED) || []

  return errors[0] && `${errors[0].type}: ${errors[0].message}`
}
