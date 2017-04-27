import React from 'react'
import PropTypes from 'prop-types'

const FunctionalComponent = ({ prop }) => (
  <div>{ prop }</div>
)

FunctionalComponent.propTypes = {
  prop: PropTypes.string
}

FunctionalComponent.defaultProps = {
  prop: 'String'
}

export default FunctionalComponent
