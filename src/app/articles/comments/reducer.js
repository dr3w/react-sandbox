import { Record, OrderedMap } from 'immutable'
import { arrayToMap, onApiStart, onApiSuccess, onApiFail } from 'common/helpers'
import { GET_ARTICLE_COMMENTS, START, SUCCESS, FAIL, PRISTINE } from 'common/constants'

const ArticleCommentsModel = Record({
  id: null,
  user: null,
  text: null
})

const DefaultReducerState = Record({
  status: PRISTINE,
  error: null,
  entities: OrderedMap({})
})

const articleCommentsReducer = (state = new DefaultReducerState({}), action) => {
  const { type, error, response, articleId } = action

  switch (type) {
    case GET_ARTICLE_COMMENTS + SUCCESS:
      return onApiSuccess(state
        .setIn(['entities', articleId], arrayToMap(response, ArticleCommentsModel))
      )

    case GET_ARTICLE_COMMENTS + START:
      return onApiStart(state)

    case GET_ARTICLE_COMMENTS + FAIL:
      return onApiFail(state, error)

    default:
      return state
  }
}

export default articleCommentsReducer
