import { Error, Spinner } from 'components'
import { compose, branch, renderComponent, withProps } from 'recompose'

const withStatusHandler = ({
  isReady = () => true,
  errorMessage = () => ''
}) => BaseComponent => compose(
  branch(
    errorMessage,
    renderComponent(
      withProps(props => ({ message: errorMessage(props) || '' }))(Error)
    )
  ),
  branch(
    isReady,
    renderComponent(BaseComponent),
    renderComponent(Spinner)
  )
)(BaseComponent)

export default withStatusHandler
