export const initialLoadData = ({ initListRoute, match }) => initListRoute(match.params.type)
export const isReady = ({ todos }) => todos
export const errorMessage = () => false // todosStatus.error
