import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withRouter, matchPath } from 'react-router'

const isMatching = (test, pattern, exact) => matchPath(test, {
  path: pattern,
  strict: false,
  exact
})

const NavLinkLi = (props) => {
  const { children, location, to, exact } = props

  return (
    <li
      className={isMatching(location.pathname, to, exact) ? 'active' : ''}
    >
      <NavLink exact={exact} to={to}>
        {children}
      </NavLink>
    </li>
  )
}

NavLinkLi.propTypes = {
  to: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.string,
  exact: PropTypes.bool
}

NavLinkLi.defaultProps = {
  children: null,
  exact: false
}

export default withRouter(NavLinkLi)
