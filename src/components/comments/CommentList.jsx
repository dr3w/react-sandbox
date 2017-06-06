import React from 'react'
import PropTypes from 'prop-types'

import './CommentList.scss'

const CommentList = ({ comments }) => {
  if (!comments) return null

  const emptyList = <p>No comments yet</p>

  const commentList = comments.map(comment => (
    <li key={comment.id}>
      { comment.text }
    </li>
  ))

  return (
    comments && comments.length ?
      <ul className="comment-list comment-list-normal">
        {commentList}
      </ul> : <div>{emptyList}</div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array
}

export default CommentList
