import React from 'react'
import PropTypes from 'prop-types'
import { Button, CommentList } from 'common/components'

const CommentListPreload = ({ comments, loadComments }) => (
  <div>
    { comments.length ?
      <CommentList comments={comments} /> : <Button text="Load comments" onClick={loadComments} /> }
  </div>
)

CommentListPreload.propTypes = {
  comments: PropTypes.array,
  loadComments: PropTypes.func
}

CommentListPreload.defaultProps = {
  comments: [],
  loadComments: () => null
}

export default CommentListPreload
