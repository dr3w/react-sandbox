import 'common/components/comments/CommentList.scss'

import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Button, CommentList, Status } from 'common/components'
import { LOADING } from 'common/constants'

const CommentListLazy = ({ status, error, comments, loadComments }) => {
  const getCommentsComponent = () => {
    if (!comments.length) return null

    return (
      <CSSTransitionGroup
        transitionName="comment-list-lazy"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <CommentList comments={comments} />
      </CSSTransitionGroup>
    )
  }

  const getLoadMoreButton = () => {
    if (comments.length) return null

    return (
      <Button
        text="Load comments"
        onClick={loadComments}
        isDisabled={status === LOADING}
      />
    )
  }

  return (
    <div>
      { getLoadMoreButton() }
      { getCommentsComponent() }

      <Status
        status={status}
        error={error}
      />
    </div>
  )
}

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
