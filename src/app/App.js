import React  from 'react'
import { PropTypes } from 'prop-types'

function App(props) {
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  )
}

App.propTypes = {
  comment: PropTypes.shape({})
}

export default App
