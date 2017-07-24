import _ from 'lodash'
import { createSelector } from 'reselect'

export const getTodosStatus = state => _.get(state, ['todo', 'status'])
export const getTodos = state => _.get(state, ['todo', 'data'])
export const getTodosType = state => _.get(state, ['todo', 'meta', 'type'])

export const getTodosFilteredByType = createSelector(
  getTodos,
  getTodosType,
  (todos, type) => todos && _.pickBy(todos, ({ data }) => (
      type === 'all' ||
      (type === 'done' && data.isDone) ||
      (type === 'todo' && !data.isDone)
    )
  )
)
