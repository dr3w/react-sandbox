import apiSaga from 'common/apiSaga'
import { takeLatest } from 'redux-saga/effects'
import { createActionNames } from 'common/createReducer'
import * as c from 'common/constants'

const TODOS = createActionNames(c.TODOS)
const TODOS_DELETE = createActionNames(c.TODOS_DELETE)
const TODOS_ADD = createActionNames(c.TODOS_ADD)
const TODOS_TOGGLE = createActionNames(c.TODOS_TOGGLE)

function* fetchTodos({ meta }) {
  const query = {
    isDone: undefined
  }

  if (meta.type === 'done') {
    query.isDone = 'true'
  } else if (meta.type === 'todo') {
    query.isDone = 'false'
  }

  const args = ['todos', { query }]

  yield apiSaga({
    args,
    meta,
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
    before: () => fetchTodos({ meta })
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
    },
    before: () => fetchTodos({ meta })
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
