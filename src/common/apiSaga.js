import callAPI from 'common/api'
import { call, put } from 'redux-saga/effects'

export default function* apiSaga({
  args = [],
  meta,
  type = {
    start: '',
    succeeded: '',
    failed: ''
  },
  before = () => null,
  after = () => null
}) {
  yield put({ type: type.start, meta })

  try {
    const payload = yield call(callAPI, ...args)
    yield before(payload)
    yield put({ type: type.succeeded, payload, meta })
    yield after(payload)
  } catch (e) {
    yield put({ type: type.failed, error: e.message, meta })
  }
}
