import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Article } from '../articles'
import { increment } from './actions'

const ArticleList = (props) => {
  const { match, counter } = props

  const onClick = () => {
    props.increment()
  }

  return (
    <div>
      <ul>
        <li>
          <Link to="/articles/1">Article 1</Link>
        </li>
        <li>
          <Link to="/articles/2">Article 2</Link>
        </li>
        <li>
          <Link to="/articles/3">Article 3</Link>
        </li>
        <li>
          <Link to="/articles/4">Article 4</Link>
        </li>
      </ul>
      <Route path={`${match.path}/:id`} component={Article} />
      {counter}
      <button onClick={onClick}>click</button>
    </div>
  )
}

ArticleList.propTypes = {
  match: PropTypes.object.isRequired,
  increment: PropTypes.func.isRequired,
  counter: PropTypes.number
}

ArticleList.defaultProps = {
  counter: 0
}

const mapStateToProps = state => ({
  counter: state.articles
})

const mapDispatchToProps = dispatch => ({
  increment: incBy => dispatch(increment(incBy))
})
// OR – just return object
// const mapDispatchToProps = { increment }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
