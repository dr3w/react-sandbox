import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ errorMessage }) => (
  <div className="error">
    <h3>ERROR!</h3>
    <p>{errorMessage}</p>
  </div>
)

Error.propTypes = {
  errorMessage: PropTypes.string
}

Error.defaultProps = {
  errorMessage: ''
}

export default Error
