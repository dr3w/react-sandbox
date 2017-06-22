import React from 'react'
import { articleShape } from 'common/shapes'
// import CommentListContainer from 'app/containers/CommentListContainer'
import CommentListContainerPreload from 'app/containers/CommentListContainerPreload'

const ArticleView = ({ article }) => (
  <div>
    <article>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p><b>{article.date}</b></p>
    </article>

    <CommentListContainerPreload articleId={article.id} />
  </div>
)

ArticleView.propTypes = {
  article: articleShape
}

export default ArticleView
