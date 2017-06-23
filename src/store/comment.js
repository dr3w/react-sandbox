import { handle } from 'redux-pack'
import callAPI from 'common/api'
import { Record, Map } from 'immutable'
import {
  onStart, onSuccess, onFailure, arrayToMap, shouldFetch, getReducerData, getReducerStatus
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
export const getComments = (state, articleId) => getReducerData(state.comment, articleId)
export const getCommentsStatus = (state, articleId) => getReducerStatus(state.comment, articleId)

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
