import React from 'react'
import PropTypes from 'prop-types'
import { articleShape } from 'common/shapes'
import { CommentListLazy } from 'components'

const ArticleCommentView = ({ comments, loadComments }) =>
  <CommentListLazy comments={comments} loadComments={loadComments} />


ArticleCommentView.propTypes = {
  article: articleShape,
  comments: PropTypes.array,
  loadComments: PropTypes.func
}

export default ArticleCommentView
