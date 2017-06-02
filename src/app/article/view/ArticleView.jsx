import React from 'react'
import PropTypes from 'prop-types'
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
  article: articleShape,
  comments: PropTypes.array
}

ArticleView.defaultProps = {
  article: {},
  comments: []
}

export default ArticleView
