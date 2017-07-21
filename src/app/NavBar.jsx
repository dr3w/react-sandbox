import React from 'react'
import { Link } from 'react-router-dom'
import { NavLinkLi } from 'components'

const NavBar = () => (
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
)

export default NavBar
