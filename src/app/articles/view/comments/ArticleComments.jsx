import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticleComments, addArticleComment } from 'app/articles/actions'
import { ArticleCommentAdd } from 'app/articles/view/comments'
import { CommentListLazy } from 'common/components'
import { mapToArray } from 'common/helpers'

class ArticleComments extends React.PureComponent {
  onSubmit = values => this.props.addArticleComment(this.props.articleId, values)
  loadComments = () => this.props.getArticleComments(this.props.articleId)

  render() {
    const { comments, status, error } = this.props

    return (
      <section>
        <ArticleCommentAdd
          onSubmit={this.onSubmit}
        />
        <CommentListLazy
          error={error}
          status={status}
          comments={comments}
          loadComments={this.loadComments}
        />
      </section>
    )
  }
}

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  comments: PropTypes.array,

  getArticleComments: PropTypes.func.isRequired,
  addArticleComment: PropTypes.func.isRequired
}

ArticleComments.defaultProps = {
  comments: [],
  error: null
}

const mapStateToProps = (state, props) => ({
  comments: mapToArray(state.articleComments.getIn(['entities', props.articleId])),
  status: state.articleComments.status,
  error: state.articleComments.error
})

const mapDispatchToProps = { getArticleComments, addArticleComment }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComments)
