import React from 'react'
import PropTypes from 'prop-types'
import { ArticleComments } from 'app/articles/comments/'

const ArticleBody = ({ text, date, articleId }) => (
  <div>
    <p>{text}</p>
    <p><b>{date}</b></p>

    <ArticleComments articleId={articleId} />
  </div>
)

ArticleBody.propTypes = {
  articleId: PropTypes.string.isRequired,
  text: PropTypes.string,
  date: PropTypes.string
}

ArticleBody.defaultProps = {
  text: '',
  date: null
}

export default ArticleBody
