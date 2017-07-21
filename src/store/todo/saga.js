import apiSaga from 'common/store/apiSaga'
import { takeLatest, select, put } from 'redux-saga/effects'
import { getTodosType } from 'store/todo/selectors'
import { actions } from 'store/todo'

const { TODOS, TODOS_ADD, TODOS_TOGGLE, TODOS_DELETE } = actions

function* fetchTodos() {
  const type = yield select(getTodosType)
  const query = {
    isDone: undefined
  }

  if (type === 'done') {
    query.isDone = 'true'
  } else if (type === 'todo') {
    query.isDone = 'false'
  }

  const args = ['todos', { query }]

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
  yield takeLatest(TODOS.FETCH_REQUESTED, fetchTodos)
  yield takeLatest(TODOS_ADD.UPDATE_REQUESTED, addTodo)
  yield takeLatest(TODOS_TOGGLE.UPDATE_REQUESTED, toggleTodo)
  yield takeLatest(TODOS_DELETE.UPDATE_REQUESTED, deleteTodo)
}

export default todoSaga
