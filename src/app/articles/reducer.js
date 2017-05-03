import { Record, OrderedMap } from 'immutable'
import { arrayToMap, onApiStart, onApiSuccess, onApiFail } from 'common/helpers'
import { GET_ALL_ARTICLES, GET_ARTICLE, GET_ARTICLE_COMMENTS, START, SUCCESS, FAIL, PRISTINE } from 'common/constants'

const ArticleModel = Record({
  id: null,
  date: null,
  title: null,
  text: null,
  commentsFull: []
})

const DefaultReducerState = Record({
  status: PRISTINE,
  error: null,
  entities: new OrderedMap({})
})

const articlesReducer = (state = new DefaultReducerState({}), action) => {
  const { type, error, response, articleId } = action

  switch (type) {
    case GET_ALL_ARTICLES + SUCCESS:
      return onApiSuccess(state
        .update('entities', entities => arrayToMap(response, ArticleModel).merge(entities))
      )

    case GET_ALL_ARTICLES + START:
      return onApiStart(state)

    case GET_ALL_ARTICLES + FAIL:
      return onApiFail(state, error)

    case GET_ARTICLE + SUCCESS:
      return state
        .updateIn(['entities', response.id], entity => ArticleModel(response).merge(entity))

    case GET_ARTICLE_COMMENTS + SUCCESS:
      return state
        .setIn(['entities', articleId, 'commentsFull'], response)

    default:
      return state
  }
}

export default articlesReducer
