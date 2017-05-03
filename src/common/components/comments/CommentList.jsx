import React from 'react'
import PropTypes from 'prop-types'

const CommentList = ({ text }) => (
  <div>{ text }</div>
)

CommentList.propTypes = {
  text: PropTypes.string
}

CommentList.defaultProps = {
  text: 'Press me'
}

export default CommentList
