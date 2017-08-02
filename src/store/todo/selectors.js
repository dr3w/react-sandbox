import { getTodoType } from 'store/app/selectors'
import { createSelector } from 'reselect'

export const getAllTodos = state => state.todo.toJS()
export const getAllTodosMap = state => state.todo

export const getTodosFilteredByType = createSelector(
  getAllTodosMap,
  getTodoType,
  (todos, type) => todos && todos.filter(todo => (
    type === 'all' ||
    (type === 'done' && todo.isDone) ||
    (type === 'todo' && !todo.isDone)
  )).toJS()
)
