import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { increment } from './actions'

const FunctionalComponentStore = (props) => {
  const { counter } = props

  const onClick = () => {
    props.increment(10)
  }

  return (
    <div>
      <span>{counter} </span>
      <button onClick={onClick}>click</button>
    </div>
  )
}

FunctionalComponentStore.propTypes = {
  increment: PropTypes.func.isRequired,
  counter: PropTypes.number
}

FunctionalComponentStore.defaultProps = {
  counter: 0
}

const mapStateToProps = state => ({
  counter: state.dummies
})

const mapDispatchToProps = dispatch => ({
  increment: incBy => dispatch(increment(incBy))
})
// OR – just return object
// const mapDispatchToProps = { increment }

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalComponentStore)
