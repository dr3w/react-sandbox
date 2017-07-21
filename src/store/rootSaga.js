import { fork } from 'redux-saga/effects'

import todo from 'store/todo/saga'

export default function* root() {
  yield [
    fork(todo)
  ]
}
