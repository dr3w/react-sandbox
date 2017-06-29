import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import withStatusHandling from 'hoc/withStatusHandling'
import withRouteOnEnter from 'hoc/withRouteOnEnter'
import { articleActions, getArticle, getArticleStatus } from 'store/article'
import { commentActions } from 'store/comment'
import { articleShape } from 'common/shapes'
import * as helper from 'common/helpers'
import ArticleView from 'app/article/components/ArticleView'

const onCommentSubmit = (articleId, submitComment) => (data) => {
  submitComment(articleId, data)
}

const ArticleViewContainer = ({ article, submitComment }) =>
  <ArticleView
    article={article}
    onCommentSubmit={onCommentSubmit(article.id, submitComment)}
  />

ArticleViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  article: articleShape
}

const mapStateToProps = (state, props) => {
  const articleId = props.match.params.id

  return {
    article: getArticle(state, articleId),
    status: getArticleStatus(state, articleId)
  }
}

const mapDispatchToProps = {
  submitComment: commentActions.submitComment,
  checkAndFetchArticle: articleActions.checkAndFetchArticle
}

const loadData = ({ match, checkAndFetchArticle }) => {
  const articleId = match.params.id
  // const force = status && status.error && prevProps.match.params.id !== articleId

  checkAndFetchArticle(articleId)
}

const isReady = ({ status }) => helper.isStatusReady([status])
const errorMessage = ({ status }) => helper.statusErrorMessage([status])

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

