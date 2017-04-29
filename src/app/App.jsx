import React from 'react'
import { Provider } from 'react-redux'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import store from '../store'
import { ArticleList } from '../articles'

const App = () => (
  <Provider store={store}>
    <div>
      <h1>Articles app</h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/nothing">404</Link></li>
      </ul>

      <Switch>
        <Redirect exact from="/" to="/articles" />
        <Route path="/articles" component={ArticleList} />
        <Redirect to="/404" />
      </Switch>
    </div>
  </Provider>
)

export default App
