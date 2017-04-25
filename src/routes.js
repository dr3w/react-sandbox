import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App } from './app'
import { ArticlesList } from './articles'

export default (
  <Router>
    <div>
      <App/>
      
      <Route path="/articles" component={ArticlesList}/>
    </div>
  </Router>
)
