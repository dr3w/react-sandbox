import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticle } from 'app/articles/actions'
import { ArticleBody } from 'app/articles/view'
import { Status } from 'common/components'
import { LOADING } from 'common/constants'

const loadData = (props, oldProps) => {
  if (!oldProps || (oldProps.match.params.id !== props.match.params.id)) {
    props.getArticle(props.match.params.id)
  }
}

class ArticleViewRoute extends React.PureComponent {
  componentDidMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    loadData(nextProps, this.props)
  }

  render() {
    const { article, status, error } = this.props

    return (
      <div>
        <Status
          status={status}
          error={error}
        />

        {
          status !== LOADING && article &&
          <ArticleBody
            text={article.text}
            date={article.date}
            articleId={article.id}
          />
        }
      </div>
    )
  }
}

ArticleViewRoute.propTypes = {
  match: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  article: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string
  }),
  error: PropTypes.string,

  getArticle: PropTypes.func.isRequired
}

ArticleViewRoute.defaultProps = {
  article: null,
  error: null
}

const mapStateToProps = (state, props) => ({
  article: state.articleView.entities.toJS()[props.match.params.id],
  status: state.articleView.status,
  error: state.articleView.error
})

const mapDispatchToProps = { getArticle }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleViewRoute)
