import fetch from 'isomorphic-fetch'
import qs from 'qs'
import { START, SUCCESS, FAIL } from 'common/constants'

const headers = new Headers({
  'Content-Type': 'application/json'
})

const getRequestBody = (method, data) => (
  (!(method === 'GET' || method === 'HEAD') && data && JSON.stringify(data)) || null
)

const getQueryParams = (method, data) => (
  ((method === 'GET' || method === 'HEAD') && data && `?${qs.stringify(data)}`) || ''
)

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

export default (/* store */) => next => (action) => {
  const { api, type, ...rest } = action

  if (!api) return next(action)

  const onSuccess = response => next({ ...rest, type: type + SUCCESS, response })
  const onFail = error => next({ ...rest, type: type + FAIL, error })
  const doFetch = ({ url, method = 'GET', data }) => {
    const body = getRequestBody(method, data)
    const queryUrl = url + getQueryParams(method, data)

    const request = new Request(queryUrl, {
      method, body, headers
    })

    // TODO: remove
    setTimeout(() => {
      fetch(request)
        .then(onFetch)
        .then(onSuccess)
        .catch(onFail)
    }, 1000)
  }

  doFetch(api)

  return next({ ...rest, type: type + START })
}
