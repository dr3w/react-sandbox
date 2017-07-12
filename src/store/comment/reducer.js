import { handle } from 'redux-pack'
import { Record, Map } from 'immutable'
import {
  onStart, onSuccess, onFailure, arrayToMap
} from 'common/helpers'
import { COMMENT_FETCH } from './const'

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
    case COMMENT_FETCH:
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
