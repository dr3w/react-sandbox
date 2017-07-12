import React from 'react'
// import PropTypes from 'prop-types'
// import { compose } from 'recompose'
// import withStatusHandling from 'hoc/withStatusHandling'
import CommentList from 'components/comment/CommentList'
import { CommentAdd } from 'components'
// import * as helper from 'common/helpers'
import { errorMessage } from 'app/comment/selectors'

import './Comments.scss'

// const CommentListEnhanced = compose(
//   withStatusHandling({
//     isReady: props => helper.isStatusLoaded([props.commentsStatus]),
//     errorMessage: props => helper.statusErrorMessage([props.commentsStatus])
//   })
// )(CommentList)

const showError = ({ comments, otherComments }) => {
  const error = errorMessage({ comments, otherComments })

  return error && <div className="alert alert-danger center">ERROR {error}</div>
}

const CommentsView = (props) => {
  const { comments, otherComments, onCommentSubmit } = props

  return (
    <div>

      {showError(props)}

      {otherComments.data && otherComments.data.length}

      <CommentAdd onSubmit={onCommentSubmit} />
      <CommentList comments={comments.data} />
    </div>
  )
}

CommentsView.propTypes = {}

export default CommentsView
