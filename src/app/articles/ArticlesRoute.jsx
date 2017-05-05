import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { mapToArray } from 'common/helpers'
import { resetStatus } from 'app/actions'
import { getAllArticles } from 'app/articles/actions'
import { Status } from 'common/components'
import { ArticlesList } from 'app/articles'
import { ArticleViewRoute } from 'app/articles/view'
import { LOADING } from 'common/constants'

class ArticlesRoute extends React.PureComponent {
  componentDidMount() {
    this.props.resetStatus()
    this.props.getAllArticles()
  }

  render() {
    const { match, articles, status, error } = this.props

    return (
      <div className="row">
        <div className="col-md-4">
          <Status
            status={status}
            error={error}
          />

          {
            (status !== LOADING && articles.length) ?
              <ArticlesList
                url={match.url}
                articles={articles}
              /> : ''
          }
        </div>
        <div className="col-md-8">
          <Route path={`${match.path}/:id`} component={ArticleViewRoute} />
        </div>
      </div>
    )
  }
}

ArticlesRoute.propTypes = {
  match: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  articles: PropTypes.array,
  error: PropTypes.string,

  getAllArticles: PropTypes.func.isRequired,
  resetStatus: PropTypes.func.isRequired
}

ArticlesRoute.defaultProps = {
  articles: [],
  error: null
}

const mapStateToProps = state => ({
  articles: mapToArray(state.articles.entities),
  status: state.articles.status,
  error: state.articles.error
})

const mapDispatchToProps = { getAllArticles, resetStatus }

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesRoute)
