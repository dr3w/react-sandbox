import _isEmpty from 'lodash/isEmpty'
import { takeLatest, put, select } from 'redux-saga/effects'

import { getAllTodos } from 'store/todo/selectors'
import TODO from 'store/todo/actions'
import * as todoAC from 'store/todo/AC'
import * as appAC from 'store/app/AC'
import * as errorAC from 'store/error/AC'

function* todoList({ meta }) {
  yield put(errorAC.errorClearAll())
  yield put(appAC.setTodoType(meta.type))

  const allTodos = yield select(getAllTodos)

  if (_isEmpty(allTodos)) yield put(todoAC.fetchAllTodos())
}

function* routeSaga() {
  yield takeLatest(TODO.ROUTE_INIT.LIST, todoList)
}

export default routeSaga
