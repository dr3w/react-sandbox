import React from 'react'
import PropTypes from 'prop-types'

const Status = ({ status, error }) => (
  <h3>{status} {error}</h3>
)

Status.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string
}

Status.defaultProps = {
  status: '',
  error: ''
}

export default Status
