import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import _get from 'lodash/get'
import withDataPreload from 'hoc/withDataPreload'
import { articleActions, getArticle, getArticleStatus } from 'reducers/article'
import { articleShape } from 'common/shapes'
import ArticleView from 'app/components/ArticleView'

const ArticleViewContainer = ({ article }) => <ArticleView article={article} />

ArticleViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  article: articleShape,
  comments: PropTypes.array
}

const mapStateToProps = state => ({
  article: getArticle(state),
  articleStatus: getArticleStatus(state)
})

const mapDispatchToProps = {
  checkAndFetchArticle: articleActions.checkAndFetchArticle
}

const loadData = ({ match, checkAndFetchArticle }) => {
  const articleId = match.params.id

  checkAndFetchArticle(articleId)
}

const isReady = ({ articleStatus }) => articleStatus.loaded
const errorMessage = ({ articleStatus }) => _get(articleStatus, ['error', 'message'])

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withDataPreload(loadData, isReady, errorMessage)
)

export default enhance(ArticleViewContainer)

