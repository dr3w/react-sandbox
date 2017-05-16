import { Record } from 'immutable'

export const ArticleListModel = Record({
  id: null,
  date: null,
  title: null
})

export const ArticleModel = Record({
  id: null,
  date: null,
  title: null,
  text: null
})

export const CommentsModel = Record({
  id: null,
  user: null,
  text: null
})
