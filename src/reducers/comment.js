import { handle } from 'redux-pack'
import callAPI from 'common/api'
import { Record, OrderedMap } from 'immutable'
import {
  StatusMap, arrayToMap, mapToArray,
  onStart, onSuccess, onFailure, onInvalidate, isStatusPristine
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
  data: new OrderedMap({}),
  status: new StatusMap()
})

const commentReducer = (state = new DefaultReducerState({}), action) => {
  const { type, payload, meta } = action

  switch (type) {
    case FETCH_COMMENT:
      return handle(state, action, {
        start: prevState => onStart(prevState),
        success: prevState => onSuccess(
          prevState.set('articleId', meta.articleId),
          arrayToMap(payload, CommentModel)
        ),
        failure: prevState => onFailure(prevState, payload)
      })

    case INVALIDATE_COMMENT_STATE:
      return onInvalidate(state.set('articleId', null))

    default:
      return state
  }
}

export default commentReducer

// SELECTORS
export const getArticleId = state => state.comment.articleId
export const getComments = state => mapToArray(state.comment.get('data'))
export const getCommentStatus = state => state.comment.get('status').toJS()

// ACTIONS
const fetchComment = articleId => ({
  type: FETCH_COMMENT,
  promise: callAPI(`/api/comment/?article=${articleId}`),
  meta: { articleId }
})

const invalidatedState = {
  type: INVALIDATE_COMMENT_STATE
}

export const commentActions = {
  checkAndFetchComments: articleId => (
    (dispatch, getState) => {
      const state = getState()
      const currentArticleId = getArticleId(state)
      const status = getCommentStatus(state)

      if (isStatusPristine(status)) {
        dispatch(fetchComment(articleId))
      } else if (currentArticleId && currentArticleId !== articleId) {
        dispatch(invalidatedState)
      }
    }
  )
}
