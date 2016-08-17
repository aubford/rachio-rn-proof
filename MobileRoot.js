import React from 'react';
import { Navigator } from 'react-native';
import { Login } from './app/containers/Login'
import { Remote } from './app/containers/Remote'

export const Root = React.createClass({

  renderScene(route, navigator){
    if(route.title === 'Login'){
      return <Login navigator={ navigator }/>
    }
    if(route.title === "Remote"){
      return <Remote navigator={ navigator }/>
    }
    return <Text>Error: Scene render fail</Text>
  },


  render() {
    return (
      <Navigator
        initialRoute={ routes[0] }
        initialRouteStack={ routes }
        renderScene= { this.renderScene }
        configureScene= { ( route,routeStack ) => Navigator.SceneConfigs.HorizontalSwipeJump}
        />
    )
  }
})

const routes = [
  { title: "Login"},
  { title: "Remote"}
]
