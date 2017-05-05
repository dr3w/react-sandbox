import 'bootstrap/dist/css/bootstrap.css'
import 'app/App.scss'

import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { NavLinkLi } from 'common/components'
import { ArticlesRoute } from 'app/articles'
import store from '../store/'

const App = () => (
  <Provider store={store}>
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Stories</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <NavLinkLi exact to="/">Home</NavLinkLi>
              <NavLinkLi to="/articles">Articles</NavLinkLi>
              <NavLinkLi to="/nothing">404</NavLinkLi>
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path="/" />
        <Route path="/articles" component={ArticlesRoute} />
        <Redirect to="/404" />
      </Switch>
    </div>
  </Provider>
)

export default App
