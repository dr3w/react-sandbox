import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { ArticlesList } from '../articles'

const App = () => (
  <div>
    <h1>Articles app</h1>

    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/articles">Articles</Link></li>
      <li><Link to="/nothing">404</Link></li>
    </ul>

    <Switch>
      <Redirect exact from="/" to="/articles" />
      <Route path="/articles" component={ArticlesList} />
      <Redirect to="/404" />
    </Switch>
  </div>
)

export default App
