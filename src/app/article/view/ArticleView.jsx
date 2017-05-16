import React from 'react'
import PropTypes from 'prop-types'

const ArticleView = ({ article }) => (
  <article>
    <h3>{article.title}</h3>
    <p>{article.text}</p>
    <p><b>{article.date}</b></p>
  </article>
)

ArticleView.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string
  })
}

ArticleView.defaultProps = {
  article: {}
}
export default ArticleView
