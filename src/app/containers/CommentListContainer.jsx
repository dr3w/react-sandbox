import React from 'react'
import PropTypes from 'prop-types'
// import _get from 'lodash/get'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
// import withDataPreload from 'hoc/withDataPreload'
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

// const loadData = ({ status, articleId, checkAndFetchComments }, prevProps) => {
//   const force = status && status.error && prevProps.articleId !== articleId
//
//   checkAndFetchComments(articleId, force)
// }
//
// const isReady = ({ status }) => _get(status, ['loaded'])
// const errorMessage = ({ status }) => _get(status, ['error', 'message'])

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  // withDataPreload({
  //   loadData,
  //   isReady,
  //   errorMessage
  // })
)

export default enhance(CommentListContainer)
