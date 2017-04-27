import React from 'react'
import PropTypes from 'prop-types'

class ClassComponent extends React.Component {
  static propTypes = {
    prop: PropTypes.string
  }
  static defaultProps = {
    prop: 'String'
  }

  render() {
    const { prop } = this.props
    return (
      <div>{ prop }</div>
    )
  }
}

export default ClassComponent
