import PropTypes from 'prop-types'

export const articleShape = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string
})

export const commentShape = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  user: PropTypes.string
})

