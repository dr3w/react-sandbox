import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, reset } from 'redux-form'

const TodoAdd = (props) => {
  const { handleSubmit, submitting } = props
  const required = value => (value ? undefined : 'Required')

  return (
    <form onSubmit={handleSubmit} className="todo-form-add">
      <div className="input-group">
        <Field
          name="text"
          className="form-control"
          component="input"
          type="text"
          placeholder="Todo..."
          disabled={submitting}
          validate={[required]}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            ADD
          </button>
        </span>
      </div>
    </form>
  )
}

TodoAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  submitting: PropTypes.bool
}

const onSubmitSuccess = (result, dispatch) => dispatch(reset('TodoAdd'))

export default reduxForm({
  form: 'TodoAdd',
  onSubmitSuccess
})(TodoAdd)
