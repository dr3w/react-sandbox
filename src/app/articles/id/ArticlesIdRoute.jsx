import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticle, getArticleComments } from 'app/articles/actions'
import { ArticleBody } from 'app/articles/id'
import { Status } from 'common/components'
import { LOADED } from 'common/constants'

const load = (props, oldProps) => {
  if (!oldProps.match ||
    (oldProps.match && oldProps.match.params.id !== props.match.params.id)) {
    props.getArticle(props.match.params.id)
  }
}

class ArticlesIdRoute extends React.PureComponent {
  constructor(props) {
    super(props)

    this.loadComments.bind(this)
  }

  componentDidMount() {
    load(this.props, {})
  }

  componentWillReceiveProps(nextProps) {
    load(nextProps, this.props)
  }

  loadComments = () => this.props.getArticleComments(this.props.match.params.id)

  render() {
    const { article, status, error } = this.props

    return (
      <div>
        <Status
          status={status}
          error={error}
        />

        {
          status === LOADED &&
          <ArticleBody
            // key={article.id}
            text={article.text}
            date={article.date}
            comments={article.commentsFull}
            loadComments={this.loadComments}
          />
        }
      </div>
    )
  }
}

ArticlesIdRoute.propTypes = {
  match: PropTypes.object.isRequired,
  article: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    commentsFull: PropTypes.array
  }),
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  getArticle: PropTypes.func.isRequired,
  getArticleComments: PropTypes.func.isRequired
}

ArticlesIdRoute.defaultProps = {
  article: {},
  error: null
}

const mapStateToProps = (state, props) => ({
  article: state.articles.entities.toJS()[props.match.params.id],
  status: state.articlesId.status,
  error: state.articlesId.error
})

const mapDispatchToProps = { getArticle, getArticleComments }

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIdRoute)
