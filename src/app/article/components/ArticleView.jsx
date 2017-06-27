import React from 'react'
import PropTypes from 'prop-types'
import { articleShape } from 'common/shapes'
// import CommentListContainer from 'app/comment/containers/CommentListContainer'
import CommentListPreloadContainer from 'app/comment/containers/CommentListPreloadContainer'

import './ArticleView.scss'

const ArticleView = ({ article }) => (
  <div>
    <article>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p><b>{article.date}</b></p>
    </article>

    <CommentListPreloadContainer articleId={article.id} />
  </div>
)

ArticleView.propTypes = {
  article: articleShape,
  location: PropTypes.object
}

export default ArticleView
