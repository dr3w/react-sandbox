import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import { withRouter } from 'react-router'
import withRouteOnEnter from 'hoc/withRouteOnEnter'
import withStatusHandling from 'hoc/withStatusHandling'
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

const loadData = ({ articleId, checkAndFetchComments }) => {
  checkAndFetchComments(articleId, true)
}

const isReady = ({ status }) => helper.isStatusReady([status])
const errorMessage = ({ status }) => helper.statusErrorMessage([status])

const enhance = compose(
  pure,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withRouteOnEnter(loadData),
  withStatusHandling({
    isReady,
    errorMessage
  })
)

export default enhance(CommentListContainer)
