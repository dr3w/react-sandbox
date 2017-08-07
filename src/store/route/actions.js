const ROUTE = {}

ROUTE.TODO_LIST = 'APP/ROUTE/TODO_LIST'
ROUTE.TODO_ITEM = 'APP/ROUTE/TODO_ITEM'

export default ROUTE

export const todoList = params => ({
  type: ROUTE.TODO_LIST,
  params
})


export const todoItem = params => ({
  type: ROUTE.TODO_ITEM,
  params
})
