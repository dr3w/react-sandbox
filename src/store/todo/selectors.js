import _ from 'lodash'
import { getTodoType } from 'store/app/selectors'
import { createSelector } from 'reselect'

export const getAllTodos = state => _.get(state, ['todo'])
export const getTodosFilteredByType = createSelector(
  getAllTodos,
  getTodoType,
  (todos, type) => todos && _.pickBy(todos, todo => (
      type === 'all' ||
      (type === 'done' && todo.isDone) ||
      (type === 'todo' && !todo.isDone)
    )
  )
)
