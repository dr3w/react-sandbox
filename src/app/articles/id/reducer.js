import { Record } from 'immutable'
import { onApiStart, onApiSuccess, onApiFail } from 'common/helpers'
import { GET_ARTICLE, START, SUCCESS, FAIL, PRISTINE } from 'common/constants'

const DefaultReducerState = Record({
  status: PRISTINE,
  error: null
})

const articlesIdReducer = (state = new DefaultReducerState({}), action) => {
  const { type, error } = action

  switch (type) {
    case GET_ARTICLE + SUCCESS:
      return onApiSuccess(state)

    case GET_ARTICLE + START:
      return onApiStart(state)

    case GET_ARTICLE + FAIL:
      return onApiFail(state, error)

    default:
      return state
  }
}

export default articlesIdReducer
