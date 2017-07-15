import React from 'react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { NavLinkLi } from 'components'
import TodoListContainer from 'app/todo/list'

import 'bootstrap/dist/css/bootstrap.css'
import './App.scss'

const App = () => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">TODO</Link>
        </div>

        <ul className="nav navbar-nav">
          <NavLinkLi to="/todos/all">All</NavLinkLi>
          <NavLinkLi to="/todos/done">Done</NavLinkLi>
          <NavLinkLi to="/todos/todo">ToDo</NavLinkLi>
        </ul>
      </div>
    </nav>

    <section>
      <Switch>
        <Redirect exact path="/" to="/todos/all" />
        <Route path="/todos/:type" component={TodoListContainer} />
      </Switch>
    </section>
  </div>
)

export default App
