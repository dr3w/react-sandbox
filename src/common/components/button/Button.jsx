import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, isDisabled, onClick }) => (
  <button
    className="btn btn-primary"
    onClick={onClick}
    disabled={isDisabled}
  >{ text }</button>
)

Button.propTypes = {
  text: PropTypes.string,
  isDisabled: PropTypes.bool,

  onClick: PropTypes.func
}

Button.defaultProps = {
  text: 'Press me',
  isDisabled: false,
  onClick: () => null
}

export default Button
