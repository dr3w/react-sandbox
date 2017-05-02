import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ArticlesList = ({ articles }) => {
  const articleList = articles.map(article => (
    <li key={article.id}>
      <Link to={`/articles/${article.id}`}>{article.title}</Link>
    </li>
  ))

  return (
    <ul>
      {articleList}
    </ul>
  )
}

ArticlesList.propTypes = {
  articles: PropTypes.array
}

ArticlesList.defaultProps = {
  articles: []
}

export default ArticlesList
