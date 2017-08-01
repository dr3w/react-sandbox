import React from 'react'
import PropTypes from 'prop-types'

const StatusDev = ({ status = {} }) => {
  const { isInitialLoad, isLoading, isUpdating, isReady, error } = status

  return (
    <div className="status-dev">
      <div>
        <span className="status-indicator">
          {isInitialLoad ? '▶' : ''}
        </span>
        <span>
          Initial:
        </span>
      </div>
      <div>
        <span className="status-indicator">
          {isLoading ? '▶' : ''}
        </span>
        <span>
          Loading:
        </span>
      </div>
      <div>
        <span className="status-indicator">
          {isUpdating ? '▶' : ''}
        </span>
        <span>
          Updating:
        </span>
      </div>
      <div>
        <span className="status-indicator">
          {isReady ? '▶' : ''}
        </span>
        <span>
          Ready:
        </span>
      </div>
      <div>
        <span className="status-indicator">
          {error ? '▶' : ''}
        </span>
        <span>
          Error: {error}
        </span>
      </div>

    </div>
  )
}

StatusDev.propTypes = {
  status: PropTypes.object
}

export default StatusDev
