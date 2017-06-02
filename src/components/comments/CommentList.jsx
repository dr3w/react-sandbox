import React from 'react'
import PropTypes from 'prop-types'

import './CommentList.scss'

const CommentList = ({ comments }) => {
  if (!comments.length) return null

  const commentList = comments.map(comment => (
    <li key={comment.id}>
      { comment.text }
    </li>
  ))

  return (
    <ul className="comment-list">
      {commentList}
    </ul>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array
}

CommentList.defaultProps = {
  comments: []
}

export default CommentList
