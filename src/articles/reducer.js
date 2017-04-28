import { Record, OrderedMap } from 'immutable'
import { arrayToMap } from '../common/helpers'
import {
  GET_ALL_ARTICLES, START, SUCCESS, FAIL,
  PRISTINE, LOADED, LOADING, FAILED
} from '../common/constants'

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
    case GET_ALL_ARTICLES:
      return state

    case GET_ALL_ARTICLES + START:
      return state
        .set('error', null)
        .set('status', LOADING)

    case GET_ALL_ARTICLES + SUCCESS:
      return state
        .update('entities', entities => arrayToMap(response, ArticleModel).merge(entities))
        .set('status', LOADED)

    case GET_ALL_ARTICLES + FAIL:
      return state
        .set('error', error)
        .set('status', FAILED)

    default:
      return state
  }
}
