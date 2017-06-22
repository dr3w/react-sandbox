import { handle } from 'redux-pack'
import callAPI from 'common/api'
import { Record, Map } from 'immutable'
import {
  onStart, onSuccess, onFailure, shouldFetch
} from 'common/helpers'

const FETCH_ARTICLE = 'FETCH_ARTICLE'

const ArticleModel = Record({
  id: null,
  date: null,
  title: null,
  text: null
})

const DefaultReducerState = Map

const articleReducer = (state = new DefaultReducerState({}), action) => {
  const { type, payload, meta = {} } = action
  const { articleId } = meta

  switch (type) {
    case FETCH_ARTICLE:
      return handle(state, action, {
        start: prevState => onStart(prevState, articleId),
        success: prevState => onSuccess(prevState, articleId, new ArticleModel(payload)),
        failure: prevState => onFailure(prevState, articleId, payload)
      })

    default:
      return state
  }
}

export default articleReducer

// SELECTORS
export const getArticle = (state, articleId) => {
  const article = state.article.getIn([articleId, 'data'])

  return article && article.toJS()
}

export const getArticleStatus = (state, articleId) => {
  const status = state.article.getIn([articleId, 'status'])

  return status && status.toJS()
}

// ACTIONS
const fetchArticle = articleId => ({
  type: FETCH_ARTICLE,
  meta: { articleId },
  promise: callAPI(`/api/article/${articleId}`)
})

const checkAndFetchArticle = (articleId, force) => (dispatch, getState) => {
  const state = getState()
  const article = getArticle(state, articleId)
  const status = getArticleStatus(state, articleId)

  if (shouldFetch(force, article, status)) {
    dispatch(fetchArticle(articleId))
  }
}

export const articleActions = {
  checkAndFetchArticle
}
