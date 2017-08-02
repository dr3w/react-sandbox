import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ message, errorDismiss }) => {
  const dismissButton = errorDismiss ? (
    <button
      type="button"
      className="close"
      aria-label="Close"
      onClick={errorDismiss}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  ) : null

  return (
    <div className="alert alert-danger" role="alert">
      {dismissButton}
      {message}
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string,
  errorDismiss: PropTypes.func
}

Error.defaultProps = {
  message: ''
}

export default Error
