import React from 'react'
import { articleShape } from 'common/shapes'
import ArticleCommentContainer from 'app/article/comment/ArticleCommentContainer'

const ArticleView = ({ article }) => (
  <div>
    <article>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p><b>{article.date}</b></p>
    </article>

    <ArticleCommentContainer articleId={article.id} />
  </div>
)

ArticleView.propTypes = {
  article: articleShape
}

export default ArticleView
