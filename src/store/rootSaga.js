import { fork } from 'redux-saga/effects'

import app from 'store/app/saga'
import todo from 'store/todo/saga'

export default function* root() {
  yield [
    fork(app),
    fork(todo)
  ]
}
