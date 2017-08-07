const ROUTE = {}

ROUTE.TODO_LIST = 'APP/ROUTE/TODO_LIST'

export default ROUTE

export const todoList = params => ({
  type: ROUTE.TODO_LIST,
  params
})

