import { handle } from 'redux-pack'
import callAPI from 'common/api'
import { Record, Map } from 'immutable'
import {
  onStart, onSuccess, onFailure, arrayToMap, mapToArray, shouldFetch
} from 'common/helpers'

const FETCH_COMMENT = 'FETCH_COMMENT'

const CommentModel = Record({
  id: null,
  user: null,
  text: null
})

const DefaultReducerState = Map

const commentReducer = (state = new DefaultReducerState({}), action) => {
  const { type, payload, meta = {} } = action
  const { articleId } = meta

  switch (type) {
    case FETCH_COMMENT:
      return handle(state, action, {
        start: prevState => onStart(prevState, articleId),
        success: prevState => onSuccess(prevState, articleId, arrayToMap(payload, CommentModel)),
        failure: prevState => onFailure(prevState, articleId, payload)
      })

    default:
      return state
  }
}

export default commentReducer

// SELECTORS
export const getComments = (state, articleId) => {
  const comments = state.comment.getIn([articleId, 'data'])

  return comments && mapToArray(comments)
}

export const getCommentsStatus = (state, articleId) => {
  const comments = state.comment.getIn([articleId, 'status'])

  return comments && comments.toJS()
}

// ACTIONS
const fetchComment = articleId => ({
  type: FETCH_COMMENT,
  meta: { articleId },
  promise: callAPI(`/api/comment/?article=${articleId}`)
})

const checkAndFetchComments = (articleId, force) => (dispatch, getState) => {
  const state = getState()
  const comments = getComments(state, articleId)
  const status = getCommentsStatus(state, articleId)

  if (shouldFetch(force, comments, status)) {
    dispatch(fetchComment(articleId))
  }
}

export const commentActions = {
  checkAndFetchComments
}
