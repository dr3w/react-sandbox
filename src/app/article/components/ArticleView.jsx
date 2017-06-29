import React from 'react'
import PropTypes from 'prop-types'
import { articleShape } from 'common/shapes'
// import CommentListContainer from 'app/comment/containers/CommentListContainer'
import CommentListPreloadContainer from 'app/comment/containers/CommentListPreloadContainer'
import { CommentAdd } from 'components'

import './ArticleView.scss'

const ArticleView = ({ article, onCommentSubmit }) => (
  <div>
    <article>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p><b>{article.date}</b></p>
    </article>

    <CommentAdd onSubmit={onCommentSubmit} />
    <CommentListPreloadContainer articleId={article.id} />
  </div>
)

ArticleView.propTypes = {
  article: articleShape,
  onCommentSubmit: PropTypes.func.isRequired
}

export default ArticleView
