import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withDataPreload from 'hoc/withDataPreload'
import { articleActions, getArticle, getArticleStatus } from 'reducers/article'
import { commentActions, getComments, getCommentStatus } from 'reducers/comment'
import { articleShape } from 'common/shapes'
import ArticleView from 'app/article/view/ArticleView'

const ArticleViewContainer = ({ article, comments }) => (
  <ArticleView
    article={article}
    comments={comments}
  />
)

ArticleViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  article: articleShape,
  comments: PropTypes.array
}

ArticleViewContainer.defaultProps = {
  article: {},
  comments: []
}

const mapStateToProps = state => ({
  article: getArticle(state),
  articleStatus: getArticleStatus(state),
  comments: getComments(state),
  commentStatus: getCommentStatus(state)
})

const mapDispatchToProps = {
  checkAndFetchArticle: articleActions.checkAndFetchArticle,
  checkAndFetchComments: commentActions.checkAndFetchComments
}

const loadData = ({ match, checkAndFetchArticle, checkAndFetchComments }) => {
  const articleId = match.params.id

  checkAndFetchArticle(articleId)
  checkAndFetchComments(articleId)
}

const isReady = ({ articleStatus, commentStatus }) => articleStatus.loaded && commentStatus.loaded
const errorMessage = ({ articleStatus, commentStatus }) =>
  (articleStatus.error && articleStatus.error.message) ||
  (commentStatus.error && commentStatus.error.message)

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDataPreload(loadData, isReady, errorMessage)
)

export default enhance(ArticleViewContainer)

