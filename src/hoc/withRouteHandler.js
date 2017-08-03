import { compose } from 'recompose'

import withRouteOnEnter from 'hoc/withRouteOnEnter'
import withStatusHandler from 'hoc/withStatusHandler'

const withRouteHandler = ({ routeOnEnter, isReady, errorMessage }) => compose(
  withRouteOnEnter(routeOnEnter),
  withStatusHandler({
    isReady,
    errorMessage
  })
)

export default withRouteHandler
