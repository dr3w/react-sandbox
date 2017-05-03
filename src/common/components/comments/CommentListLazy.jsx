import React from 'react'
import PropTypes from 'prop-types'
import { Button, CommentList } from 'common/components'

// TODO: add loading state?
const CommentListLazy = ({ comments, loadComments }) => (
  <div>
    { comments.length ?
      <CommentList comments={comments} /> : <Button text="Load comments" onClick={loadComments} /> }
  </div>
)

CommentListLazy.propTypes = {
  comments: PropTypes.array,
  loadComments: PropTypes.func
}

CommentListLazy.defaultProps = {
  comments: [],
  loadComments: () => null
}

export default CommentListLazy
