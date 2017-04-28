import fetch from 'isomorphic-fetch'
import { START, SUCCESS, FAIL } from '../common/constants'

export default (/* store */) => next => (action) => {
  const { api, type, method, ...rest } = action

  if (!api) return next(action)

  const request = new Request(api, {
    method: method || 'GET',
    redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  })

  const onFetch = response => (
    new Promise((resolve, reject) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response.json())
      } else {
        const error = new Error(response.statusText || response.status)

        error.response = response
        reject(error)
      }
    })
  )

  const onSuccess = response => next({ ...rest, type: type + SUCCESS, response })
  const onFail = error => next({ ...rest, type: type + FAIL, error })

  setTimeout(() => {
    fetch(request)
      .then(onFetch)
      .then(onSuccess)
      .catch(onFail)
  }, 1000)

  return next({ ...rest, type: type + START })
}
