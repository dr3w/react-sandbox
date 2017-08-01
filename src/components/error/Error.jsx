import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ message, errorDismiss }) => (
  <div className="alert alert-danger" role="alert">
    <button
      type="button"
      className="close"
      aria-label="Close"
      onClick={errorDismiss}
    >
      <span aria-hidden="true">&times;</span>
    </button>
    {message}
  </div>
)

Error.propTypes = {
  message: PropTypes.string,
  errorDismiss: PropTypes.func
}

Error.defaultProps = {
  message: '',
  errorDismiss: () => null
}

export default Error
