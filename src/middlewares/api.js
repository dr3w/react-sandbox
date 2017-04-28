import { START, SUCCESS, FAIL } from '../common/constants'

export default () => next => (action) => {
  const { api, type, method, ...rest } = action

  if (!api) return next(action)

  const request = new Request(api, {
    method,
    redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  })

  fetch(request)
    .then(response => response.json())
    .then(response => next({ ...rest, type: type + SUCCESS, response }))
    .catch(error => next({ ...rest, type: type + FAIL, error }))

  return next({ ...rest, type: type + START })
}
