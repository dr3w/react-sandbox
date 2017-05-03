import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const ArticlesList = ({ articles }) => {
  const articleList = articles.map(article => (
    <li key={article.id}>
      <NavLink activeClassName="is-active" to={`/articles/${article.id}`}>{article.title}</NavLink>
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
