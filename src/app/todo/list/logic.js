export const initialLoadData = ({ routeInitList, match }) => routeInitList(match.params.type)
export const isReady = () => true
export const errorMessage = () => null // ({ getEntityErrorMessage }) => getEntityErrorMessage('todo', 'root')
