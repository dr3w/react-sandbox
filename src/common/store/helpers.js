import _ from 'lodash'
import { DefaultState } from 'common/store/defaults'

export const normalizeResponseCollection = (payload) => {
  const p = _.isArray(payload) ? payload : [payload]

  return p.reduce((acc, data) => {
    acc[data.id || 0] = new DefaultState({ data })

    return acc
  }, {})
}
