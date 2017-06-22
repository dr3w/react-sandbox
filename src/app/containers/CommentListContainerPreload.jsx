import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import withDataPreload from 'hoc/withDataPreload'
import { commentActions, getComments, getCommentsStatus } from 'store/comment'
import * as helper from 'common/helpers'
import CommentList from 'components/comment/CommentList'

const CommentListContainer = ({ comments }) => <CommentList comments={comments} />

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

const loadData = ({ articleId, checkAndFetchComments }, prevProps) => {
  const force = prevProps.articleId !== articleId // force fetch on each route change

  checkAndFetchComments(articleId, force)
}

const isReady = ({ status }) => helper.isReady([status])
const errorMessage = ({ status }) => helper.errorMessage([status])

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withDataPreload({
    loadData,
    isReady,
    errorMessage
  })
)

export default enhance(CommentListContainer)
