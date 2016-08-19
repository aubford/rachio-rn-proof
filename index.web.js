import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Login } from './app/containers/Login'
import { Remote } from './app/containers/Remote'
import { WebApp } from './app/containers/WebApp'


const Root = React.createClass({
  render(){
    return(

      <Router history={browserHistory}>
        <Route path='/' component={ WebApp }>
          <IndexRoute component={ Login } />
          <Route path='/remote' component={ Remote } />
        </ Route>
      </Router>

    )
  }
})

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
