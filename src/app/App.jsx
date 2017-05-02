import React from 'react'
import { Provider } from 'react-redux'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { ArticlesRoute } from 'app/articles'
import store from '../store/'

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
        <Route path="/articles" component={ArticlesRoute} />
        <Redirect to="/404" />
      </Switch>
    </div>
  </Provider>
)

export default App
