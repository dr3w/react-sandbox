import React from 'react'
import { Link } from 'react-router-dom'

function ArticleList() {
  return (
    <h4>
      <ul>
        <li>
          <Link to="/article/1">Article 1</Link>
        </li>
        <li>
          <Link to="/article/2">Article 2</Link>
        </li>
        <li>
          <Link to="/article/3">Article 3</Link>
        </li>
        <li>
          <Link to="/article/4">Article 4</Link>
        </li>
      </ul>
    </h4>
  )
}

export default ArticleList
