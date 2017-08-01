export const initialLoadData = ({ routeInitList, match }) => routeInitList(match.params.type)
export const isReady = () => true // !isLoading('todo')
export const errorMessage = () => null// ({ getReducerErrors }) => getReducerErrors('todo')
