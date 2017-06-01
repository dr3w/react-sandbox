import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { NavLinkLi } from 'components'
import ArticleViewContainer from 'app/article/view/ArticleViewContainer'

const ArticleList = ({ list }) => {
  const articleList = list.map(article => (
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
  list: PropTypes.array
}

ArticleList.defaultProps = {
  list: []
}

export default ArticleList
