import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import * as actions from 'store/route/actions'
import { getRedirect } from 'store/route/selectors'

const RedirectContainer = ({ redirectTo }) =>
  (redirectTo ? <Redirect to={redirectTo} /> : null)

const mapStateToProps = state => ({
  redirectTo: getRedirect(state)
})

const mapDispatchToProps = {
  onRedirected: actions.onRedirected
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidUpdate() {
      const { redirectTo, onRedirected } = this.props

      if (redirectTo) onRedirected()
    }
  })
)

RedirectContainer.propTypes = {
  redirectTo: PropTypes.string
}

export default enhance(RedirectContainer)
