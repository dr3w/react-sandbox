import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Button, CommentList } from 'components'

import './CommentListLazy.scss'

const CommentListLazy = ({ comments, loadComments }) => {
  const getCommentsComponent = () => {
    if (!comments) return null

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
    if (comments) return null

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
  loadComments: PropTypes.func
}

export default CommentListLazy
