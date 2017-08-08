import { Map } from 'immutable'
import { getTodoType, getCurrentTodoId } from 'store/app/selectors'
import { createSelector } from 'reselect'

const getAllTodosMap = state => state.todo

export const getAllTodos = state => getAllTodosMap(state).toJS()

export const getTodoById = createSelector(
  getAllTodosMap,
  getCurrentTodoId,
  (todos, id) => todos.get(id, Map()).toJS()
)
export const getTodosFilteredById = createSelector(
  getAllTodosMap,
  getCurrentTodoId,
  (todos, id) => todos.filter(todo => todo.id === id).toJS()
)

export const getTodosFilteredByType = createSelector(
  getAllTodosMap,
  getTodoType,
  (todos, type) => todos && todos.filter(todo => (
    type === 'all' ||
    (type === 'done' && todo.isDone) ||
    (type === 'todo' && !todo.isDone)
  )).toJS()
)
