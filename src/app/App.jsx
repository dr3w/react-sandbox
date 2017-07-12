import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { NavLinkLi } from 'components'
import CommentsRouteHandler from 'app/comment'

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
          <NavLinkLi to="/comments/56c782f18990ecf954f6e027">First article</NavLinkLi>
          <NavLinkLi to="/comments/56c782f17b4e0ba78c7ad717">Second</NavLinkLi>
        </ul>
      </div>
    </nav>

    <section>
      <Switch>
        <Route exact path="/" />
        <Route path="/comments/:id" component={CommentsRouteHandler} />
      </Switch>
    </section>
  </div>
)

export default App
