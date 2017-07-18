import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, reset } from 'redux-form'

const TodoAdd = (props) => {
  const { handleSubmit, isUpdating } = props

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <Field
            name="text"
            className="form-control"
            component="input"
            type="text"
            placeholder="Todo"
            disabled={isUpdating}
          />
        </div>
        <button
          className="btn btn-default"
          type="submit"
          disabled={isUpdating}
        >
          ADD
        </button>
      </form>
    </div>
  )
}

TodoAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool
}

const onSubmitSuccess = (result, dispatch) => dispatch(reset('TodoAdd'))

export default reduxForm({
  form: 'TodoAdd',
  onSubmitSuccess
})(TodoAdd)
