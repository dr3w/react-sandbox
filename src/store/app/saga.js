/**
 * Saga for all routes
 */

import _isEmpty from 'lodash/isEmpty'
import { takeLatest, put, select } from 'redux-saga/effects'

import { getAllTodos } from 'store/todo/selectors'
import APP from 'store/app/actions'
import * as AC from 'store/app/AC'
import * as todoAC from 'store/todo/AC'
import * as errorAC from 'store/error/AC'

function* initRouteList({ meta }) {
  yield put(errorAC.errorClearAll())
  yield put(AC.setTodoType(meta.type))

  const allTodos = yield select(getAllTodos)

  if (_isEmpty(allTodos)) yield put(todoAC.fetchAllTodos())
}

function* appSaga() {
  yield takeLatest(APP.ROUTE.LIST, initRouteList)
}

export default appSaga
