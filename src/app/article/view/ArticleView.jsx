import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticle } from 'app/article/actions'
import ArticleComments from 'app/article/comments/ArticleComments'

const loadData = (props, oldProps) => {
  if (!oldProps || (oldProps.match.params.id !== props.match.params.id)) {
    props.getArticle(props.match.params.id)
  }
}

class ArticleView extends React.PureComponent {
  componentDidMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    loadData(nextProps, this.props)
  }

  render() {
    const { article } = this.props

    return (
        article.id &&
        <div>
          <article>
            <h3>{article.title}</h3>
            <p>{article.text}</p>
            <p><b>{article.date}</b></p>
          </article>
          <ArticleComments articleId={article.id} />
        </div>
      ) || null
  }
}

ArticleView.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string
  }),

  getArticle: PropTypes.func.isRequired
}

ArticleView.defaultProps = {
  article: {}
}

const mapStateToProps = (state, props) => ({
  article: state.article.article.toJS()[props.match.params.id]
})

const mapDispatchToProps = { getArticle }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView)
