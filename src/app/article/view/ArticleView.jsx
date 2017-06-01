import React from 'react'
import { articleShape } from 'common/shapes'
import { CommentList } from 'components'

const ArticleView = ({ article, comments }) => (
  <div>
    <article>
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p><b>{article.date}</b></p>
    </article>

    <CommentList comments={comments} />
  </div>
)

ArticleView.propTypes = {
  article: articleShape
}

ArticleView.defaultProps = {
  article: {}
}

export default ArticleView
