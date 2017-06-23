import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import withDataPreload from 'hoc/withDataPreload'
import { articleActions, getArticle, getArticleStatus } from 'store/article'
import { articleShape } from 'common/shapes'
import * as helper from 'common/helpers'
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

const isReady = ({ status }) => helper.isStatusReady([status])
const errorMessage = ({ status }) => helper.statusErrorMessage([status])

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

