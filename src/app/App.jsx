import 'bootstrap/dist/css/bootstrap.css'
import 'app/app.scss'

import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { NavLinkLi } from 'common/components'
import ArticleList from 'app/article/list/ArticleList'
import NoMatch from 'app/no-match/NoMatch'

const navbar = (
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
)

const App = () => (
  <div>
    {navbar}

    <Switch>
      <Route exact path="/" />
      <Route exact path="/404" component={NoMatch} />
      <Route path="/articles" component={ArticleList} />
      <Redirect to="/404" />
    </Switch>
  </div>
)

export default App
