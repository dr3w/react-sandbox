import React from 'react'
import Button from './Button'

const FancyButton = props => (
  <div
    style={{ backgroundColor: 'purple', padding: '10px' }}
  >
    <Button {...props} />
  </div>
)

export default FancyButton
