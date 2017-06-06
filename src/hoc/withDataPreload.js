import { Error, Spinner } from 'components'
import { compose, lifecycle, branch, renderComponent, withProps } from 'recompose'

const withDataPreload = (
  loadData = () => null,
  isLoaded = () => false,
  errorMessage = () => ''
) => BaseComponent => compose(
  lifecycle({
    componentDidMount() {
      loadData(this.props)
    },
    componentDidUpdate() {
      loadData(this.props)
    }
  }),
  branch(
    errorMessage,
    renderComponent(
      withProps(props => ({ errorMessage: errorMessage(props) || '' }))(Error)
    )
  ),
  branch(
    isLoaded,
    renderComponent(BaseComponent),
    renderComponent(Spinner)
  )
)(BaseComponent)

export default withDataPreload
