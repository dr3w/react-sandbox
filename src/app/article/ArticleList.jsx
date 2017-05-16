import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { NavLinkLi } from 'components'
import ArticleViewContainer from 'app/article/ArticleViewContainer'

const ArticleList = ({ articles }) => {
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
    <div className="row">
      <div className="col-md-4">
        <ul className="nav nav-pills nav-stacked">
          {articleList}
        </ul>
      </div>
      <div className="col-md-8">
        <Route
          path="/articles/:id"
          component={ArticleViewContainer}
        />
      </div>
    </div>
  )
}

ArticleList.propTypes = {
  articles: PropTypes.array
}

ArticleList.defaultProps = {
  articles: []
}
export default ArticleList
