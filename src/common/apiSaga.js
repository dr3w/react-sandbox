import callAPI from 'common/api'
import { call, put } from 'redux-saga/effects'

const noop = () => null

export default function* apiSaga({
  args = [],
  isUpdate = false,

  beforeStart = noop,
  afterStart = noop,
  beforeDone = noop,
  afterDone = noop,
  error = noop,

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

  yield beforeStart(meta)
  yield put({ type: t.start, meta })
  yield afterStart(meta)

  try {
    const payload = yield call(callAPI, ...args)

    yield beforeDone(payload, meta)
    yield put({ type: t.succeeded, payload, meta })
    yield afterDone(payload, meta)
  } catch (e) {
    yield put({ type: t.failed, error: e.message, meta })
    yield error(e, meta)
  }
}
