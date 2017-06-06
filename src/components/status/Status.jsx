import React from 'react'
import PropTypes from 'prop-types'
import { LOADING } from 'common/constants'

const Status = ({ status, error }) => {
  if (error) {
    return <div className="text-center bg-danger status-error">{error}</div>
  } else if (status === LOADING) {
    return <div className="status-loading" alt="Loading..." />
  }

  return null
}

Status.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string
}

Status.defaultProps = {
  status: '',
  error: ''
}

export default Status
