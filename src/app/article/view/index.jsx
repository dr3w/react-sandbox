import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { articleActions, getArticleById, getArticleComments } from 'reducers/article'
import { CommentListLazy } from 'components'
import ArticleView from 'app/article/view/ArticleView'

const loadData = (props, oldProps) => {
  if (!oldProps || (oldProps.match.params.id !== props.match.params.id)) {
    props.getArticle(props.match.params.id)
  }
}

class ArticleViewContainer extends React.PureComponent {

  componentDidMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    loadData(nextProps, this.props)
  }

  loadComments = () => this.props.getArticleComments(this.props.match.params.id)

  render() {
    const { article, comments } = this.props

    if (!article.id) return null

    return (
      <div>
        <ArticleView article={article} />
        <CommentListLazy
          comments={comments}
          loadComments={this.loadComments}
        />
      </div>
    )
  }
}

ArticleViewContainer.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string
  }),
  comments: PropTypes.array,
  match: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired,
  getArticleComments: PropTypes.func.isRequired
}

ArticleViewContainer.defaultProps = {
  article: {},
  comments: {}
}

const mapStateToProps = (state, props) => ({
  article: getArticleById(state, props.match.params.id),
  comments: getArticleComments(state, props.match.params.id)
})

const mapDispatchToProps = {
  getArticle: articleActions.getArticle,
  getArticleComments: articleActions.getArticleComments
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleViewContainer)
