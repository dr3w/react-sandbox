export const initialLoadData = ({ routeInitList, match }) => routeInitList(match.params.type)
export const isReady = () => true
export const errorMessage = ({ getEntityErrorMessage }) => getEntityErrorMessage('todo', 'root')
