import React from 'react'
import PropTypes from 'prop-types'
import { Error } from 'components'

const ErrorList = ({ errors, errorCloseById }) => {
  const errorList = errors.map((error) => {
    const errorDismiss = () => errorCloseById(error.reducer, error.id)

    return (
      <Error
        key={error.key}
        message={`${error.key}: ${error.message}`}
        errorDismiss={errorDismiss}
      />
    )
  })

  return (errors.length ? <div>{errorList}</div> : null)
}

ErrorList.propTypes = {
  errors: PropTypes.array,
  errorCloseById: PropTypes.func
}

ErrorList.defaultProps = {
  errors: [],
  errorCloseById: () => null
}

export default ErrorList
