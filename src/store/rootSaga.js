import { fork } from 'redux-saga/effects'

import route from 'store/route/saga'
import todo from 'store/todo/saga'

export default function* root() {
  yield [
    fork(route),
    fork(todo)
  ]
}
