export const initialLoadData = ({ routeInitList, match }) => routeInitList(match.params.type)
export const isReady = () => true // !isLoading('todo')
export const errorMessage = () => false // TODO: error reducer here
