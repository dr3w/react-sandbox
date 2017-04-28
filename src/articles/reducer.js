import { Record, OrderedMap } from 'immutable'
import { arrayToMap, onApiStart, onApiSuccess, onApiFail } from '../common/helpers'
import { GET_ALL_ARTICLES, START, SUCCESS, FAIL, PRISTINE } from '../common/constants'

const ArticleModel = Record({
  id: null,
  date: null,
  title: null,
  text: null
})

const DefaultReducerState = Record({
  status: PRISTINE,
  error: null,
  entities: new OrderedMap({})
})

export default (state = new DefaultReducerState({}), action) => {
  const { type, error, response } = action

  switch (type) {
    case GET_ALL_ARTICLES + START:
      return onApiStart(state)

    case GET_ALL_ARTICLES + SUCCESS:
      return onApiSuccess(state
        .update('entities', entities => arrayToMap(response, ArticleModel).merge(entities))
      )

    case GET_ALL_ARTICLES + FAIL:
      return onApiFail(state, error)

    default:
      return state
  }
}
