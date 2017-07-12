import { compose } from 'recompose'

import withRouteOnEnter from 'hoc/withRouteOnEnter'
import withStatusHandling from 'hoc/withStatusHandling'

export default ({ initialLoadData, isReady, errorMessage }) => compose(
  withRouteOnEnter(initialLoadData),
  withStatusHandling({
    isReady,
    errorMessage
  })
)
