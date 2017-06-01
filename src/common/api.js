import fetch from 'isomorphic-fetch'
import cache from 'memory-cache'

const cacheExpirationLimit = 15 * 60 * 1000
const isGETMethod = options => !options || !options.method || options.method === 'GET'

export default async function callAPI(url, options, isForce) {
  if (isForce) cache.del(url)

  const cachedResponse = cache.get(url)

  if (isGETMethod(options) && cachedResponse) {
    return cachedResponse
  }

  const resp = await fetch(url, options)
  const body = await resp.json()

  if (!resp.ok || body.error) {
    throw new Error(body.error || `Unknown error occurred (HTTP ${resp.status})!`)
  }

  if (isGETMethod(options)) {
    cache.put(url, body, cacheExpirationLimit)
  }

  return body
}
