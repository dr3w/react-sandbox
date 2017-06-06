import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { NavLinkLi } from 'components'
import ArticleListContainer from 'app/article/list/ArticleListContainer'
import NoMatch from 'app/no-match/NoMatch'

import 'bootstrap/dist/css/bootstrap.css'
import './App.scss'

const App = () => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Stories</Link>
        </div>

        <ul className="nav navbar-nav">
          <NavLinkLi exact to="/">Home</NavLinkLi>
          <NavLinkLi to="/articles">Articles</NavLinkLi>
          <NavLinkLi to="/nothing">404</NavLinkLi>
        </ul>
      </div>
    </nav>

    <section>
      <Switch>
        <Route exact path="/" />
        <Route exact path="/404" component={NoMatch} />
        <Route path="/articles" component={ArticleListContainer} />
        <Redirect to="/404" />
      </Switch>
    </section>
  </div>
)

export default App
