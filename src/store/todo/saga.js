import apiSaga from 'common/store/apiSaga'
import { takeEvery, put } from 'redux-saga/effects'
import { actions } from 'store/todo'

const { TODOS, TODOS_ADD, TODOS_TOGGLE, TODOS_DELETE } = actions

function* fetchTodos() {
  const args = ['todos']

  yield apiSaga({
    args,
    action: TODOS,
    isUpdate: false
  })
}

function* addTodo({ meta }) {
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
    action: TODOS_ADD,
    isUpdate: true,
    beforeDone: () => fetchTodos()
  })
}

function* toggleTodo({ meta }) {
  const args = [`todos/${meta.id}`, {
    method: 'PATCH',
    data: { isDone: meta.isDone }
  }]

  yield apiSaga({
    args,
    meta,
    action: TODOS_TOGGLE,
    isUpdate: true,
    error: () => put({ type: TODOS_TOGGLE.RESET_PREV_STATE, meta })
  })
}

function* deleteTodo({ meta }) {
  const args = [`todos/${meta.id}`, {
    method: 'DELETE'
  }]

  yield apiSaga({
    args,
    meta,
    action: TODOS_DELETE,
    isUpdate: true,
    error: () => put({ type: TODOS_DELETE.RESET_PREV_STATE, meta })
  })
}

function* todoSaga() {
  yield takeEvery(TODOS.FETCH_REQUESTED, fetchTodos)
  yield takeEvery(TODOS_ADD.UPDATE_REQUESTED, addTodo)
  yield takeEvery(TODOS_TOGGLE.UPDATE_REQUESTED, toggleTodo)
  yield takeEvery(TODOS_DELETE.UPDATE_REQUESTED, deleteTodo)
}

export default todoSaga
