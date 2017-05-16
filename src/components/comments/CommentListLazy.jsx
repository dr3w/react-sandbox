import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Button, CommentList } from 'components'

const CommentListLazy = ({ comments, loadComments }) => {
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
      />
    )
  }

  return (
    <div>
      { getLoadMoreButton() }
      { getCommentsComponent() }
    </div>
  )
}

CommentListLazy.propTypes = {
  comments: PropTypes.array,
  loadComments: PropTypes.func.isRequired
}

CommentListLazy.defaultProps = {
  comments: []
}

export default CommentListLazy
