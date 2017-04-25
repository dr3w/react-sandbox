import React  from 'react'
import { Link, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>Articles app</h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/articles">Articles</Link></li>
      </ul>

      <div>
        <span>You are in </span>
        <Route exact path="/" render={() => <span>Home</span>}/>
        <Route path="/articles" render={() => <span>Articles</span>}/>
      </div>
    </div>
  )
}

export default App
