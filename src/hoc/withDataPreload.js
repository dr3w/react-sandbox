import { Error, Spinner } from 'components'
import { compose, lifecycle, branch, renderComponent, withProps } from 'recompose'

const withDataPreload = ({
  loadData = () => null,
  isReady = () => false,
  errorMessage = () => ''
}) => BaseComponent => compose(
  lifecycle({
    componentDidMount() {
      loadData(this.props)
    },
    componentDidUpdate(prevProps) {
      loadData(this.props, prevProps)
    }
  }),
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
