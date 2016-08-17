import React from 'react'
import ReactNative, { AppRegistry, View, Text } from 'react-native'
import { Login } from './app/containers/Login'
import { Remote } from './app/containers/Remote'


const Root = React.createClass({
  render(){
    return(
      <Login />
    )
  }
})

AppRegistry.registerComponent('App', () => Root);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
})


// ReactNative.render(
//   <Root />,
//   document.getElementById('root')
// )
