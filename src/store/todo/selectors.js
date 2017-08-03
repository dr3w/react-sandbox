import { getTodoType } from 'store/app/selectors'
import { createSelector } from 'reselect'

const getAllTodosMap = state => state.todo

export const getAllTodos = state => getAllTodosMap(state).toJS()

export const getTodosFilteredByType = createSelector(
  getAllTodosMap,
  getTodoType,
  (todos, type) => todos && todos.filter(todo => (
    type === 'all' ||
    (type === 'done' && todo.isDone) ||
    (type === 'todo' && !todo.isDone)
  )).toJS()
)
