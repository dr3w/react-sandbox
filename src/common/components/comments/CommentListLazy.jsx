import React from 'react'
import PropTypes from 'prop-types'
import { Button, CommentList, Status } from 'common/components'

// TODO: add loading state?
const CommentListLazy = ({ status, error, comments, loadComments }) => (
  <div>
    <Status
      status={status}
      error={error}
    />
    { comments.length ?
      <CommentList comments={comments} /> : <Button text="Load comments" onClick={loadComments} /> }
  </div>
)

CommentListLazy.propTypes = {
  comments: PropTypes.array,
  status: PropTypes.string,
  error: PropTypes.string,
  loadComments: PropTypes.func.isRequired
}

CommentListLazy.defaultProps = {
  comments: [],
  status: '',
  error: ''
}

export default CommentListLazy
