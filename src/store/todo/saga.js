import apiSaga from 'common/apiSaga'
import { takeLatest, select } from 'redux-saga/effects'
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
    type: {
      start: TODOS.FETCH_START,
      succeeded: TODOS.FETCH_SUCCEEDED,
      failed: TODOS.FETCH_FAILED
    }
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
    type: {
      start: TODOS_ADD.UPDATE_START,
      succeeded: TODOS_ADD.UPDATE_SUCCEEDED,
      failed: TODOS_ADD.UPDATE_FAILED
    },
    before: () => fetchTodos()
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
    type: {
      start: TODOS_TOGGLE.UPDATE_START,
      succeeded: TODOS_TOGGLE.UPDATE_SUCCEEDED,
      failed: TODOS_TOGGLE.UPDATE_FAILED
    }
    // before: () => fetchTodos()
  })
}

function* deleteTodo({ meta }) {
  const args = [`todos/${meta.id}`, {
    method: 'DELETE'
  }]

  yield apiSaga({
    args,
    meta,
    type: {
      start: TODOS_DELETE.UPDATE_START,
      succeeded: TODOS_DELETE.UPDATE_SUCCEEDED,
      failed: TODOS_DELETE.UPDATE_FAILED
    }
    // before: () => fetchTodos({ meta })
  })
}

function* todoSaga() {
  yield takeLatest(TODOS.FETCH_REQUESTED, fetchTodos)
  yield takeLatest(TODOS_ADD.UPDATE_REQUESTED, addTodo)
  yield takeLatest(TODOS_TOGGLE.UPDATE_REQUESTED, toggleTodo)
  yield takeLatest(TODOS_DELETE.UPDATE_REQUESTED, deleteTodo)
}

export default todoSaga
