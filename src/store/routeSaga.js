import _isEmpty from 'lodash/isEmpty'
import { takeLatest, put, select } from 'redux-saga/effects'

import { getAllTodos } from 'store/todo/selectors'
import TODO from 'store/todo/actions'
import * as AC from 'store/todo/AC'
import * as AC_APP from 'store/app/AC'

function* todoList({ meta }) {
  yield put(AC_APP.setTodoType(meta.type))

  const allTodos = yield select(getAllTodos)

  if (_isEmpty(allTodos)) yield put(AC.fetchAllTodos())
}

function* routeSaga() {
  yield takeLatest(TODO.ROUTE_INIT.LIST, todoList)
}

export default routeSaga
