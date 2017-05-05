import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => (
  <div className="jumbotron text-center">
    <h1>404</h1>
    <Link className="btn btn-primary btn-lg" to="/">Home</Link>
  </div>
)
export default NoMatch
