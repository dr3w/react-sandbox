import { handle } from 'redux-pack'
import callAPI from 'common/api'
import { Record } from 'immutable'
import {
  StatusMap, arrayToMap, mapToArray,
  onStart, onSuccess, onFailure, isStatusPristine
} from 'common/helpers'

const FETCH_COMMENT = 'FETCH_COMMENT'
const INVALIDATE_COMMENT_STATE = 'INVALIDATE_COMMENT_STATE'

const CommentModel = Record({
  id: null,
  user: null,
  text: null
})

const DefaultReducerState = Record({
  articleId: null,
  data: null,
  status: new StatusMap()
})

const commentReducer = (state = new DefaultReducerState({}), action) => {
  const { type, payload, meta } = action

  switch (type) {
    case FETCH_COMMENT:
      return handle(state, action, {
        start: prevState => onStart(prevState.set('articleId', meta.articleId)),
        success: prevState => onSuccess(prevState, arrayToMap(payload, CommentModel)),
        failure: prevState => onFailure(prevState, payload)
      })

    case INVALIDATE_COMMENT_STATE:
      return new DefaultReducerState({})

    default:
      return state
  }
}

export default commentReducer

// SELECTORS
export const getArticleId = state => state.comment.articleId
export const getComments = state => mapToArray(state.comment.get('data'))
export const getCommentsStatus = state => state.comment.get('status').toJS()

// ACTIONS
const fetchComments = articleId => ({
  type: FETCH_COMMENT,
  promise: callAPI(`/api/comment/?article=${articleId}`),
  meta: { articleId }
})

const invalidatedState = {
  type: INVALIDATE_COMMENT_STATE
}

const checkAndInvalidateComments = articleId => (dispatch, getState) => {
  const currentArticleId = getArticleId(getState())
  // console.log('!!', currentArticleId, articleId)
  if (currentArticleId && currentArticleId !== articleId) {
    dispatch(invalidatedState)
  }
}

const checkAndFetchComments = articleId => (dispatch, getState) => {
  const status = getCommentsStatus(getState())

  if (isStatusPristine(status)) {
    dispatch(fetchComments(articleId))
  } else {
    dispatch(checkAndInvalidateComments(articleId))
  }
}

export const commentActions = {
  checkAndInvalidateComments,
  checkAndFetchComments
}
