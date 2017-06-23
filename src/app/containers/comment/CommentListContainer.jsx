import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import { commentActions, getComments, getCommentsStatus } from 'store/comment'
import CommentListLazy from 'components/comment/CommentListLazy'

const CommentListContainer = ({ articleId, comments, checkAndFetchComments }) => {
  const loadComments = () => checkAndFetchComments(articleId)

  return (
    <CommentListLazy
      comments={comments}
      loadComments={loadComments}
    />
  )
}

CommentListContainer.propTypes = {
  articleId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  checkAndFetchComments: PropTypes.func
}

const mapStateToProps = (state, { articleId }) => ({
  comments: getComments(state, articleId),
  status: getCommentsStatus(state, articleId)
})

const mapDispatchToProps = {
  checkAndFetchComments: commentActions.checkAndFetchComments
}

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(CommentListContainer)
