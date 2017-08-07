import PropTypes from 'prop-types'

export const todoShape = PropTypes.shape({
  id: PropTypes.number,
  text: PropTypes.string,
  isDone: PropTypes.bool
})

export const routeContainerShape = {
  getIsLoading: PropTypes.func.isRequired,
  getErrorsById: PropTypes.func.isRequired,
  getErrorsByType: PropTypes.func.isRequired,
  getErrorsByReducer: PropTypes.func.isRequired,
  initRoute: PropTypes.func.isRequired
}
