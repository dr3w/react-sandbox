import React from 'react'
import { articleShape } from 'common/shapes'
import CommentListContainer from 'app/containers/CommentListContainer'

const ArticleView = ({ article }) => (
  <div>
    <article>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p><b>{article.date}</b></p>
    </article>

    <CommentListContainer articleId={article.id} />
  </div>
)

ArticleView.propTypes = {
  article: articleShape
}

export default ArticleView
