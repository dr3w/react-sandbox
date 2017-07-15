import PropTypes from 'prop-types'

export const todoShape = PropTypes.shape({
  id: PropTypes.number,
  text: PropTypes.string,
  isDone: PropTypes.bool
})

