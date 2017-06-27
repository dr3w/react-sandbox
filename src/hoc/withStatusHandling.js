import { Error, Spinner } from 'components'
import { compose, branch, renderComponent, withProps } from 'recompose'

const withDataPreload = ({
  isReady = () => false,
  errorMessage = () => ''
}) => BaseComponent => compose(
  branch(
    errorMessage,
    renderComponent(
      withProps(props => ({ errorMessage: errorMessage(props) || '' }))(Error)
    )
  ),
  branch(
    isReady,
    renderComponent(BaseComponent),
    renderComponent(Spinner)
  )
)(BaseComponent)

export default withDataPreload
