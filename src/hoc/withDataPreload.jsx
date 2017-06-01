import 'hoc/withDataPreload.scss'

import React from 'react'
import { compose, lifecycle, branch, renderComponent, withProps } from 'recompose'

const Spinner = () => (
  <div className="spinner">
    <div className="loader">Loading...</div>
  </div>
)

const Error = ({ errorMessage }) => (
  <div className="error">
    <h3>ERROR!</h3>
    <p>{errorMessage}</p>
  </div>
)

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
    renderComponent(withProps(
      props => ({ errorMessage: errorMessage(props) })
    )(Error))
  ),
  branch(
    isLoaded,
    renderComponent(BaseComponent),
    renderComponent(Spinner)
  )
)(BaseComponent)

export default withDataPreload
