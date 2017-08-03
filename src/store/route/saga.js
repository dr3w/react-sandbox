/**
 * Saga for all routes
 */

import _isEmpty from 'lodash/isEmpty'
import { takeLatest, put, select } from 'redux-saga/effects'

import { getAllTodos } from 'store/todo/selectors'
import ROUTE from 'store/route/actions'
import * as appAC from 'store/app/AC'
import * as todoAC from 'store/todo/AC'
import * as errorAC from 'store/error/AC'

function* todoList({ params }) {
  yield put(errorAC.errorClearAll())
  yield put(appAC.setTodoType(params.type))

  const allTodos = yield select(getAllTodos)

  if (_isEmpty(allTodos)) yield put(todoAC.fetchAllTodos())
}

function* routeSaga() {
  yield takeLatest(ROUTE.TODO_LIST, todoList)
}

export default routeSaga
