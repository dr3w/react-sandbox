import fetch from 'isomorphic-fetch'
import qs from 'qs'
import cache from 'memory-cache'
import { START, SUCCESS, FAIL } from 'common/constants'

// TODO: https://github.com/zellwk/zl-fetch

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

const doFetch = (url, method, body) => {
  const request = new Request(url, {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method,
    body
  })

  return fetch(request)
    .then(onFetch)
}

const apiMiddleware = (/* store */) => next => (action) => {
  const { api, type, ...rest } = action

  if (!api) return next(action)

  const { url, method = 'GET', data } = api

  const body = getRequestBody(method, data)
  const queryUrl = url + getQueryParams(method, data)
  const cachedResponse = method === 'GET' && cache.get(queryUrl)

  const onSuccess = response => next({ ...rest, type: type + SUCCESS, response })
  const onFail = error => next({ ...rest, type: type + FAIL, error })

  next({ ...rest, type: type + START })

  if (cachedResponse) {
    onSuccess(cachedResponse)
  } else {
    doFetch(queryUrl, method, body)
      .then((response) => {
        if (method === 'GET') {
          cache.put(queryUrl, response, 60 * 1000)
        }

        onSuccess(response)
      }, onFail)
  }

  return true
}

export default apiMiddleware
