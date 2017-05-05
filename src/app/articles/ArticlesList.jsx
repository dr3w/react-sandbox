import 'app/articles/Articles.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { NavLinkLi } from 'common/components'

const ArticlesList = ({ articles }) => {
  const articleList = articles.map(article => (
    <NavLinkLi
      key={article.id}
      to={`/articles/${article.id}`}
      exact
    >
      {article.title}
    </NavLinkLi>
  ))

  return (
    <ul className="nav nav-pills nav-stacked">
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
