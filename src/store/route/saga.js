/**
 * Saga for all routes
 */

import _isEmpty from 'lodash/isEmpty'
import { takeLatest, put, select } from 'redux-saga/effects'

import { getAllTodos } from 'store/todo/selectors'
import ROUTE from 'store/route/actions'
import * as appActions from 'store/app/actions'
import * as todoActions from 'store/todo/actions'
import * as errorActions from 'store/error/actions'

function* todoList({ params }) {
  yield put(errorActions.errorClearAll())
  yield put(appActions.setTodoType(params.type))
  const allTodos = yield select(getAllTodos)


  if (_isEmpty(allTodos)) yield put(todoActions.fetchAllTodos())
}

function* todoItem({ params }) {
  yield put(errorActions.errorClearAll())
  yield put(appActions.setTodoId(params.id))

  const allTodos = yield select(getAllTodos)

  if (_isEmpty(allTodos)) yield put(todoActions.fetchAllTodos())
}

function* routeSaga() {
  yield takeLatest(ROUTE.TODO_LIST, todoList)
  yield takeLatest(ROUTE.TODO_ITEM, todoItem)
}

export default routeSaga
