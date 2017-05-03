import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { mapToArray } from 'common/helpers'
import { getAllArticles } from 'app/articles/actions'
import { Status } from 'common/components/'
import { ArticlesList } from 'app/articles'
import { ArticlesIdRoute } from 'app/articles/id'
import { LOADED } from 'common/constants'

class ArticlesCmp extends React.PureComponent {
  componentDidMount() {
    this.props.getAllArticles()
  }

  render() {
    const { match, articles, status, error } = this.props

    return (
      <div>
        <Status
          status={status}
          error={error}
        />
        {
          status === LOADED &&
          <div>
            <ArticlesList articles={articles} />
            <Route path={`${match.path}/:id`} component={ArticlesIdRoute} />
          </div>
        }
      </div>
    )
  }
}

ArticlesCmp.propTypes = {
  match: PropTypes.object.isRequired,
  articles: PropTypes.array,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  getAllArticles: PropTypes.func.isRequired
}

ArticlesCmp.defaultProps = {
  articles: [],
  error: null
}

const mapStateToProps = state => ({
  articles: mapToArray(state.articles.entities),
  status: state.articles.status,
  error: state.articles.error
})

const mapDispatchToProps = { getAllArticles }

const ArticlesRoute = connect(mapStateToProps, mapDispatchToProps)(ArticlesCmp)

export default ArticlesRoute
