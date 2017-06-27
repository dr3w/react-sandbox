import React from 'react'
import PropTypes from 'prop-types'
import { articleShape } from 'common/shapes'
// import CommentListContainer from 'app/containers/comment/CommentListContainer'
import CommentListContainerPreload from 'app/containers/comment/CommentListContainerPreload'

import './ArticleView.scss'

const ArticleView = ({ article, location }) => (
  <div>
    <article>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p><b>{article.date}</b></p>
    </article>

    <CommentListContainerPreload articleId={article.id} location={location} />
  </div>
)

ArticleView.propTypes = {
  article: articleShape,
  location: PropTypes.object
}

export default ArticleView
