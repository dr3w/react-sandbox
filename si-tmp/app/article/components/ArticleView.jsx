import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { articleShape } from 'common/shapes'
import withStatusHandling from 'hoc/withStatusHandling'
// import CommentListContainer from 'app/comment/containers/CommentListContainer'
// import CommentListPreloadContainer from 'app/comment/containers/CommentListPreloadContainer'
import CommentList from 'components/comment/CommentList'
import { CommentAdd } from 'components'
import * as helper from 'common/helpers'

import './ArticleView.scss'

const CommentListEnhanced = compose(
  withStatusHandling({
    isReady: props => helper.isStatusLoaded([props.commentsStatus]),
    errorMessage: props => helper.statusErrorMessage([props.commentsStatus])
  })
)(CommentList)

const ArticleView = ({ article, comments, commentsStatus, onCommentSubmit }) => (
  <div>
    <article>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p><b>{article.date}</b></p>
    </article>

    {commentsStatus.posted && 'posted'} - {commentsStatus.posting && 'posting'}

    <CommentAdd onSubmit={onCommentSubmit} />
    <CommentListEnhanced commentsStatus={commentsStatus} comments={comments} />
  </div>
)

// <CommentListPreloadContainer articleId={article.id} />

ArticleView.propTypes = {
  article: articleShape,
  comments: PropTypes.array,
  commentsStatus: PropTypes.object.isRequired,
  onCommentSubmit: PropTypes.func.isRequired
}

export default ArticleView
