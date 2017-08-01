import apiSaga from 'common/store/apiSaga'
import { takeEvery } from 'redux-saga/effects'

import TODO from 'store/todo/actions'

function* fetchAllTodos() {
  const args = ['todos']

  yield apiSaga({
    args,
    actions: TODO.FETCH
  })
}

function* todoAdd({ meta }) {
  const args = ['todos', {
    method: 'POST',
    data: {
      id: Date.now(),
      isDone: false,
      text: meta.text
    }
  }]

  yield apiSaga({
    args,
    meta,
    actions: TODO.ADD,
    success: () => fetchAllTodos()
  })
}

function* todoToggle({ meta }) {
  const args = [`todos/${meta.id}`, {
    method: 'PATCH',
    data: { isDone: meta.isDone }
  }]

  yield apiSaga({
    args,
    meta,
    actions: TODO.TOGGLE
  })
}

function* todoDelete({ meta }) {
  const args = [`todos/${meta.id}`, {
    method: 'DELETE'
  }]

  yield apiSaga({
    args,
    meta,
    actions: TODO.DELETE
  })
}

function* todoSaga() {
  yield takeEvery(TODO.FETCH.API_REQUESTED, fetchAllTodos)
  yield takeEvery(TODO.ADD.API_REQUESTED, todoAdd)
  yield takeEvery(TODO.TOGGLE.API_REQUESTED, todoToggle)
  yield takeEvery(TODO.DELETE.API_REQUESTED, todoDelete)
}

export default todoSaga
