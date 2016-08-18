import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Login } from './app/containers/Login'
import { Remote } from './app/containers/Remote'


const Root = React.createClass({
  render(){
    return(
      <Router history={browserHistory} style={{ flex: 1, display: "flex" }}>
        <Route path='/' component={ Login } />
        <Route path='/remote' component={ Remote } />
      </Router>
    )
  }
})

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
