import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import _get from 'lodash/get'
import withDataPreload from 'hoc/withDataPreload'
import { articleActions, getArticle, getArticleStatus } from 'store/article'
import { articleShape } from 'common/shapes'
import ArticleView from 'app/components/ArticleView'

const ArticleViewContainer = ({ article }) => <ArticleView article={article} />

ArticleViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
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
  checkAndFetchArticle: articleActions.checkAndFetchArticle
}

const loadData = ({ status, match, checkAndFetchArticle }, prevProps) => {
  const articleId = match.params.id
  const force = status && status.error && prevProps.match.params.id !== articleId

  checkAndFetchArticle(articleId, force)
}

const isReady = ({ status }) => _get(status, ['loaded'])
const errorMessage = ({ status }) => _get(status, ['error', 'message'])

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withDataPreload({
    loadData,
    isReady,
    errorMessage
  })
)

export default enhance(ArticleViewContainer)

