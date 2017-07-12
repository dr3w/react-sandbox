import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import withRouteHandler from 'hoc/withRouteHandler'

// actions
import { checkAndFetchComments } from 'store/comment/actions'

// selectors
import { getComments, getCommentsStatus } from 'store/comment/selectors'
import { getArticleId, initialLoadData, isReady, errorMessage } from 'app/comment/selectors'

// // view
import Comments from 'app/comment/Comments'

// const onCommentSubmit = (articleId, submitComment) => (data) => {
//   submitComment(articleId, data)
// }

const CommentsRouteHandler = props => <Comments {...props} />

CommentsRouteHandler.propTypes = {
  comments: PropTypes.shape({
    data: PropTypes.array,
    status: PropTypes.object
  }),
  otherComments: PropTypes.shape({
    data: PropTypes.array,
    status: PropTypes.object
  })
}

const mapStateToProps = (state, props) => ({
  comments: {
    data: getComments(state, getArticleId(props)),
    status: getCommentsStatus(state, getArticleId(props))
  },
  otherComments: {
    data: getComments(state, '56c782f17b4e0ba78c7ad717--'),
    status: getCommentsStatus(state, '56c782f17b4e0ba78c7ad717--')
  }
})

const mapDispatchToProps = {
  checkAndFetchComments
}

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withRouteHandler({
    initialLoadData,
    isReady
    // errorMessage
  })
)

export default enhance(CommentsRouteHandler)

