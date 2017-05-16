import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticleComments, addArticleComment } from 'app/article/actions'
import { CommentListLazy } from 'common/components'
import { mapToArray } from 'common/helpers'
import ArticleCommentAdd from 'app/article/comments/ArticleCommentAdd'

class ArticleComments extends React.PureComponent {
  onSubmit = values => this.props.addArticleComment(this.props.articleId, values)
  loadComments = () => this.props.getArticleComments(this.props.articleId)

  render() {
    const { comments } = this.props

    return (
      <section>
        <ArticleCommentAdd
          onSubmit={this.onSubmit}
        />
        <CommentListLazy
          comments={comments}
          loadComments={this.loadComments}
        />
      </section>
    )
  }
}

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  comments: PropTypes.array,

  getArticleComments: PropTypes.func.isRequired,
  addArticleComment: PropTypes.func.isRequired
}

ArticleComments.defaultProps = {
  comments: []
}

const mapStateToProps = (state, props) => ({
  comments: mapToArray(state.article.getIn(['comments', props.articleId]))
})

const mapDispatchToProps = { getArticleComments, addArticleComment }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComments)
