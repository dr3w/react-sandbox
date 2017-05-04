import React from 'react'
import PropTypes from 'prop-types'
import { Button, CommentList, Status } from 'common/components'
import { LOADING } from 'common/constants'

const CommentListLazy = ({ status, error, comments, loadComments }) => (
  <div>
    <Status
      status={status}
      error={error}
    />
    {
      comments.length ?
        <CommentList comments={comments} /> :
        <Button
          text="Load comments"
          onClick={loadComments}
          isDisabled={status === LOADING}
        />
    }
  </div>
)

CommentListLazy.propTypes = {
  status: PropTypes.string.isRequired,
  comments: PropTypes.array,
  error: PropTypes.string,

  loadComments: PropTypes.func.isRequired
}

CommentListLazy.defaultProps = {
  comments: [],
  error: ''
}

export default CommentListLazy
