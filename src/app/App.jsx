import 'bootstrap/dist/css/bootstrap.css'
import 'app/App.scss'

import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { ArticlesRoute } from 'app/articles'
import store from '../store/'

const App = () => (
  <Provider store={store}>
    <div>
      <h1 className="hot-sauce">Articles app</h1>

      <ul>
        <li><NavLink activeClassName="is-active" exact to="/">Home</NavLink></li>
        <li><NavLink activeClassName="is-active" to="/articles">Articles</NavLink></li>
        <li><NavLink activeClassName="is-active" to="/nothing">404</NavLink></li>
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
