import { compose } from 'recompose'

import withRouteOnEnter from 'hoc/withRouteOnEnter'
import withStatusHandler from 'hoc/withStatusHandler'

const withRouteHandler = ({ initialLoadData, isReady, errorMessage }) => compose(
  withRouteOnEnter(initialLoadData),
  withStatusHandler({
    isReady,
    errorMessage
  })
)

export default withRouteHandler
