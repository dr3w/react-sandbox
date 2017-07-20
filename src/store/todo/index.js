import createReducer from 'common/createReducer'

const { actions, reducer } = createReducer(
  ['TODOS', 'TODOS_ADD', 'TODOS_TOGGLE', 'TODOS_DELETE']
)

// custom actions
actions.TODOS.SET_TYPE = 'TODOS/SET_TYPE'

export { actions, reducer }
