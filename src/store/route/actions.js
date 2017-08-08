const ROUTE = {}

ROUTE.REDIRECT = 'ROUTE/REDIRECT'
ROUTE.REDIRECTED = 'ROUTE/REDIRECTED'
ROUTE.TODO_LIST = 'ROUTE/TODO_LIST'
ROUTE.TODO_ITEM = 'ROUTE/TODO_ITEM'

export default ROUTE

export const redirect = redirectTo => ({
  type: ROUTE.REDIRECT,
  meta: {
    redirectTo
  }
})

export const onRedirected = () => ({
  type: ROUTE.REDIRECTED
})

export const todoList = params => ({
  type: ROUTE.TODO_LIST,
  params
})

export const todoItem = params => ({
  type: ROUTE.TODO_ITEM,
  params
})
