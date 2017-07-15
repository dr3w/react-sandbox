import { fork } from 'redux-saga/effects'

import watchTodo from 'store/todo/saga'

export default function* root() {
  yield [
    fork(watchTodo)
  ]
}
