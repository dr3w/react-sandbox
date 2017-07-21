import callAPI from 'common/api'
import { call, put } from 'redux-saga/effects'

export default function* apiSaga({
  args = [],
  isUpdate = false,
  before = () => null,
  after = () => null,
  meta, action, type
}) {
  let t = type

  if (!t && action) {
    const op = isUpdate ? 'UPDATE' : 'FETCH'
    t = {
      start: action[`${op}_START`],
      succeeded: action[`${op}_SUCCEEDED`],
      failed: action[`${op}_FAILED`]
    }
  }

  yield put({ type: t.start, meta })

  try {
    const payload = yield call(callAPI, ...args)
    yield before(payload)
    yield put({ type: t.succeeded, payload, meta })
    yield after(payload)
  } catch (e) {
    yield put({ type: t.failed, error: e.message, meta })
  }
}
