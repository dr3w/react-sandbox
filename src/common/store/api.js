import fetch from 'isomorphic-fetch'
import cache from 'memory-cache'
import qs from 'qs'

const cacheExpirationLimit = 15 * 60 * 1000
const isGETMethod = options => !options || !options.method || options.method === 'GET'
const defaultHeaders = new Headers()

defaultHeaders.append('Content-Type', 'application/json')

export default async function callAPI(rUrl, options, isForce) {
  const { data, query, ...restOptions } = options || {}

  const queryString = qs.stringify(query)
  const url = `/api/${rUrl}${queryString && `?${queryString}`}`

  if (isForce) cache.del(url)

  const cachedResponse = null // cache.get(url) // DO NOT CACHE

  if (isGETMethod(options) && cachedResponse) {
    return cachedResponse
  }

  const fetchOptions = Object.assign({
    cache: 'default',
    headers: defaultHeaders,
    body: data && JSON.stringify(data)
  }, restOptions)

  const resp = await fetch(url, fetchOptions)

  const body = await resp.json()

  if (!resp.ok || body.error) {
    throw new Error(body.error || `Unknown error occurred (HTTP ${resp.status})!`)
  }

  if (isGETMethod(options)) {
    cache.put(url, body, cacheExpirationLimit)
  }

  return body
}
