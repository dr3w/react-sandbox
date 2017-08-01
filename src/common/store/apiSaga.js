import callAPI from 'common/store/api'
import { call, put } from 'redux-saga/effects'

const noop = () => null

export default function* apiSaga({
  args = [],
  meta = {},
  actions = {},

  start = noop,
  success = noop,
  fail = noop
}) {
  yield put({ type: actions.API_START, meta })
  yield start()

  try {
    const payload = yield call(callAPI, ...args)

    yield success(payload)
    yield put({ type: actions.API_SUCCEEDED, meta, payload })
  } catch (err) {
    yield fail(err)
    yield put({ type: actions.API_FAILED, meta, error: err })
  }
}
