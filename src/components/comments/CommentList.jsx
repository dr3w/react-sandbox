import React from 'react'
import PropTypes from 'prop-types'

import './CommentList.scss'

const CommentList = ({ comments }) => {
  if (!comments) return null

  const commentList = comments.map(comment => (
    <li key={comment.id}>
      { comment.text }
    </li>
  ))

  return (
    <ul className="comment-list comment-list-normal">
      {commentList}
    </ul>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array
}

export default CommentList
