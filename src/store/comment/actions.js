import callAPI from 'common/api'
import { shouldFetch, createDispatchWithPromise } from 'common/helpers'
import { getComments, getCommentsStatus } from './selectors'
import { COMMENT_FETCH } from './const'

const fetchComment = articleId => ({
  type: COMMENT_FETCH,
  meta: { articleId },
  promise: callAPI(`/api/comment/?article=${articleId}`)
})

const checkAndFetchComments = (articleId, force) => (dispatch, getState) => {
  const dispatchWithPromise = createDispatchWithPromise(dispatch)

  const state = getState()
  const comments = getComments(state, articleId)
  const status = getCommentsStatus(state, articleId)

  if (shouldFetch(force, comments, status)) {
    return dispatchWithPromise(fetchComment(articleId))
  }

  return Promise.resolve(comments)
}

export {
  checkAndFetchComments
}
