import React from 'react'
import PropTypes from 'prop-types'
import { articleShape } from 'common/shapes'
import { CommentListLazy } from 'components'

const ArticleView = ({ article, comments, loadComments }) => {
  const loadArticleComments = () => loadComments(article.id)

  return (
    <div>
      <article>
        <h3>{article.title}</h3>
        <p>{article.text}</p>
        <p><b>{article.date}</b></p>
      </article>

      <CommentListLazy comments={comments} loadComments={loadArticleComments} />
    </div>
  )
}

ArticleView.propTypes = {
  article: articleShape,
  comments: PropTypes.array,
  loadComments: PropTypes.func
}

export default ArticleView
