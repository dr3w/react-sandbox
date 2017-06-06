import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import withDataPreload from 'hoc/withDataPreload'
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

const mapStateToProps = state => ({
  comments: getComments(state),
  commentStatus: getCommentsStatus(state)
})

const mapDispatchToProps = {
  checkAndInvalidateComments: commentActions.checkAndInvalidateComments,
  checkAndFetchComments: commentActions.checkAndFetchComments
}

const loadData = ({ articleId, checkAndInvalidateComments }) => {
  checkAndInvalidateComments(articleId)
}

const isReady = () => true
const errorMessage = ({ commentStatus }) => _get(commentStatus, ['error', 'message'])

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withDataPreload(loadData, isReady, errorMessage)
)

export default enhance(CommentListContainer)

