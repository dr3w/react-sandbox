import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import withStatusHandling from 'hoc/withStatusHandling'
import withRouteOnEnter from 'hoc/withRouteOnEnter'
import { articleActions, getArticle, getArticleStatus } from 'store/article'
import { commentActions, getComments, getCommentsStatus } from 'store/comment'
import { articleShape } from 'common/shapes'
import * as helper from 'common/helpers'
import ArticleView from 'app/article/components/ArticleView'

const onCommentSubmit = (articleId, submitComment) => (data) => {
  submitComment(articleId, data)
}

const ArticleViewContainer = ({ article, comments, commentsStatus, submitComment }) =>
  <ArticleView
    article={article}
    comments={comments}
    commentsStatus={commentsStatus}
    onCommentSubmit={onCommentSubmit(article.id, submitComment)}
  />

ArticleViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  articleStatus: PropTypes.object.isRequired,
  commentsStatus: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  comments: PropTypes.array,
  article: articleShape
}

const mapStateToProps = (state, props) => {
  const articleId = props.match.params.id

  return {
    article: getArticle(state, articleId),
    comments: getComments(state, articleId),
    articleStatus: getArticleStatus(state, articleId),
    commentsStatus: getCommentsStatus(state, articleId)
  }
}

const mapDispatchToProps = {
  submitComment: commentActions.submitComment,
  checkAndFetchArticle: articleActions.checkAndFetchArticle,
  checkAndFetchComments: commentActions.checkAndFetchComments
}

const loadData = ({ match, checkAndFetchArticle, checkAndFetchComments }) => {
  const articleId = match.params.id
  // const force = status && status.error && prevProps.match.params.id !== articleId

  checkAndFetchArticle(articleId)
  checkAndFetchComments(articleId, true)
}

const isReady = ({ articleStatus }) =>
  helper.isStatusReady([articleStatus])

const errorMessage = ({ articleStatus, commentsStatus }) =>
  helper.statusErrorMessage([articleStatus, commentsStatus])

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withRouteOnEnter(loadData),
  withStatusHandling({
    isReady,
    errorMessage
  })
)

export default enhance(ArticleViewContainer)

