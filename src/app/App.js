import React  from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { ArticlesList, Article } from '../articles'
import { NoMatch } from './'

function App() {
  return (
    <div>
      <h1>Articles app</h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/nothing">404</Link></li>
      </ul>

      <div>
        <span>You are in </span>
        <Route exact path="/" render={() => <span>Home</span>}/>
        <Route path="/articles" render={() => <span>Articles</span>}/>
      </div>

      <Switch>
        <Redirect exact from="/" to="/articles"/>
        <Route path="/articles" component={ArticlesList}/>
        <Route path="/article/:id" component={Article}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  )
}

export default App
