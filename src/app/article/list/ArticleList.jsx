import 'app/article/article.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLinkLi } from 'common/components'
import { mapToArray } from 'common/helpers'
import { getAllArticles } from 'app/article/actions'
import ArticleView from 'app/article/view/ArticleView'

class ArticleList extends React.PureComponent {
  componentDidMount() {
    this.props.getAllArticles()
  }

  render() {
    const articleList = this.props.articles.map(article => (
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
          <Route path="/articles/:id" component={ArticleView} />
        </div>
      </div>
    )
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array,

  getAllArticles: PropTypes.func.isRequired
}

ArticleList.defaultProps = {
  articles: []
}

const mapStateToProps = state => ({
  articles: mapToArray(state.article.articleList)
})

const mapDispatchToProps = { getAllArticles }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
