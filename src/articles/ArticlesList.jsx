import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { Article } from '../articles'

const ArticleList = ({ match }) => (
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
  </div>
)

ArticleList.propTypes = {
  match: PropTypes.object.isRequired
}

export default ArticleList
