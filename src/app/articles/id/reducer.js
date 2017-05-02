import { Record, OrderedMap } from 'immutable'
import { onApiStart, onApiSuccess, onApiFail } from 'common/helpers'
import { GET_ARTICLE, START, SUCCESS, FAIL, PRISTINE } from 'common/constants'

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

const articlesIdReducer = (state = new DefaultReducerState({}), action) => {
  const { type, error, response } = action

  switch (type) {
    case GET_ARTICLE + SUCCESS:
      return onApiSuccess(state
        .setIn(['entities', response.id], new ArticleModel(response))
      )

    case GET_ARTICLE + START:
      return onApiStart(state)

    case GET_ARTICLE + FAIL:
      return onApiFail(state, error)

    default:
      return state
  }
}

export default articlesIdReducer
