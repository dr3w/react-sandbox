import React from 'react'
import PropTypes from 'prop-types'

import './StatusDev.scss'

const StatusDev = ({ status }) => {
  const { isInitialLoad, isLoading, isUpdating, isReady } = status

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
    </div>
  )
}

StatusDev.propTypes = {
  status: PropTypes.string
}

export default StatusDev
