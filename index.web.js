import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Login } from './app/containers/Login'
import { Remote } from './app/containers/Remote'
import { stl } from './app/util'

const WebApp = React.createClass({
  render(){
    return (
      <div style={stl( {height: "100vh"} )}>
        {this.props.children}
      </div>
    )
  }
})


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
