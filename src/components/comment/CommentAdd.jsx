import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, reset } from 'redux-form'

const CommentAdd = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Field name="user" className="form-control" component="input" type="text" placeholder="Name" />
        </div>
        <div className="form-group">
          <Field name="text" className="form-control" component="textarea" placeholder="Comment" />
        </div>
        <button className="btn btn-default" type="submit">Add comment</button>
      </form>
    </div>
  )
}

CommentAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

const onSubmitSuccess = (result, dispatch) => dispatch(reset('articleCommentAdd'))

export default reduxForm({
  form: 'articleCommentAdd',
  onSubmitSuccess
})(CommentAdd)
