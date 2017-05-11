import React from 'react'
import PropTypes from 'prop-types'
import { ArticleComments } from 'app/articles/view/comments'

const ArticleBody = ({ text, date, title, articleId }) => (
  <article>
    <h3>{title}</h3>
    <p>{text}</p>
    <p><b>{date}</b></p>

    <ArticleComments articleId={articleId} />
  </article>
)

ArticleBody.propTypes = {
  articleId: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string
}

ArticleBody.defaultProps = {
  title: '',
  text: '',
  date: null
}

export default ArticleBody
