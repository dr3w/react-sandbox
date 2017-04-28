import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Article } from '../articles'
import { getAllArticles } from './actions'
import { mapToArray } from '../common/helpers'

class ArticleList extends React.PureComponent {
  componentDidMount() {
    this.props.getAllArticles()
  }

  render() {
    const { match, articles } = this.props

    const articleList = articles.map(article => (
      <li key={article.id}>
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </li>
    ))

    return (
      <div>
        <ul>
          {articleList}
        </ul>
        <Route path={`${match.path}/:id`} component={Article} />
      </div>
    )
  }
}

ArticleList.propTypes = {
  match: PropTypes.object.isRequired,
  articles: PropTypes.array,
  status: PropTypes.string.isRequired,
  error: PropTypes.object,
  getAllArticles: PropTypes.func.isRequired
}

ArticleList.defaultProps = {
  articles: [],
  error: null
}

const mapStateToProps = state => ({
  articles: mapToArray(state.articles.entities),
  status: state.articles.status,
  error: state.articles.error
})

const mapDispatchToProps = { getAllArticles }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
