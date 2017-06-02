import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import _get from 'lodash/get'
import withDataPreload from 'hoc/withDataPreload'
import { articleActions, getArticle, getArticleStatus } from 'reducers/article'
import { commentActions, getComments } from 'reducers/comment'
import { articleShape } from 'common/shapes'
import ArticleView from 'app/article/view/ArticleView'

const ArticleViewContainer = ({ article, comments, checkAndFetchComments }) => (
  <ArticleView
    article={article}
    comments={comments}
    loadComments={checkAndFetchComments}
  />
)

ArticleViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  article: articleShape,
  comments: PropTypes.array,
  checkAndFetchComments: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  article: getArticle(state),
  articleStatus: getArticleStatus(state),
  comments: getComments(state)
})

const mapDispatchToProps = {
  checkAndFetchArticle: articleActions.checkAndFetchArticle,
  checkAndInvalidateComments: commentActions.checkAndInvalidateComments,
  checkAndFetchComments: commentActions.checkAndFetchComments
}

const loadData = ({ match, checkAndFetchArticle, checkAndInvalidateComments }) => {
  const articleId = match.params.id

  checkAndFetchArticle(articleId)
  checkAndInvalidateComments(articleId)
}

const isReady = ({ articleStatus }) => articleStatus.loaded
const errorMessage = ({ articleStatus }) => _get(articleStatus, ['error', 'message'])

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDataPreload(loadData, isReady, errorMessage)
)

export default enhance(ArticleViewContainer)

