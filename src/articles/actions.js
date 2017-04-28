import { INCREMENT } from '../common/constants'

const increment = incBy => ({
  type: INCREMENT,
  incBy
})

export { increment }
