import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { mapToArray } from 'common/helpers'
import { getAllArticles } from 'app/articles/actions'
import { ArticlesList } from 'app/articles'
import { ArticlesId } from 'app/articles/id'

class Articles extends React.PureComponent {
  componentDidMount() {
    this.props.getAllArticles()
  }

  render() {
    const { match, articles, status, error } = this.props

    return (
      <div>
        <h4>{status} {error}</h4>
        <ArticlesList articles={articles} />
        <Route path={`${match.path}/:id`} component={ArticlesId} />
      </div>
    )
  }
}

Articles.propTypes = {
  match: PropTypes.object.isRequired,
  articles: PropTypes.array,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  getAllArticles: PropTypes.func.isRequired
}

Articles.defaultProps = {
  articles: [],
  error: null
}

const mapStateToProps = state => ({
  articles: mapToArray(state.articles.entities),
  status: state.articles.status,
  error: state.articles.error
})

const mapDispatchToProps = { getAllArticles }

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
