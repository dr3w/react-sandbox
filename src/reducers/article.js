import { handle } from 'redux-pack'
import callAPI from 'common/api'
import { Record } from 'immutable'
import {
  StatusMap, onStart, onSuccess, onFailure, onInvalidate, isStatusPristine
} from 'common/helpers'

const FETCH_ARTICLE = 'FETCH_ARTICLE'
const INVALIDATE_ARTICLE_STATE = 'INVALIDATE_ARTICLE_STATE'

const ArticleModel = Record({
  id: null,
  date: null,
  title: null,
  text: null
})

const DefaultReducerState = Record({
  data: null,
  status: new StatusMap()
})

const articleReducer = (state = new DefaultReducerState({}), action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_ARTICLE:
      return handle(state, action, {
        start: prevState => onStart(prevState),
        success: prevState => onSuccess(prevState, new ArticleModel(payload)),
        failure: prevState => onFailure(prevState, payload)
      })

    case INVALIDATE_ARTICLE_STATE:
      return onInvalidate(state)

    default:
      return state
  }
}

export default articleReducer

// SELECTORS
export const getArticle = state => state.article.get('data')
export const getArticleStatus = state => state.article.get('status').toJS()

// ACTIONS
const fetchArticle = articleId => ({
  type: FETCH_ARTICLE,
  promise: callAPI(`/api/article/${articleId}`)
})

const invalidatedState = {
  type: INVALIDATE_ARTICLE_STATE
}

export const articleActions = {
  checkAndFetchArticle: articleId => (dispatch, getState) => {
    const state = getState()
    const article = getArticle(state)
    const status = getArticleStatus(state)

    if (isStatusPristine(status)) {
      dispatch(fetchArticle(articleId))
    } else if (article && article.id !== articleId) {
      dispatch(invalidatedState)
    }
  }
}
