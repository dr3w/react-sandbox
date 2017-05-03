import React from 'react'
import PropTypes from 'prop-types'
import { CommentListLazy } from 'common/components'

const ArticleBody = ({ text, date, comments, loadComments }) => (
  <div>
    <p>{text}</p>
    <p><b>{date}</b></p>

    <CommentListLazy comments={comments} loadComments={loadComments} />
  </div>
)

ArticleBody.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string,
  comments: PropTypes.array,
  loadComments: PropTypes.func.isRequired
}

ArticleBody.defaultProps = {
  text: '',
  date: null,
  comments: []
}

export default ArticleBody
