import React from 'react'
import ReactNative, { AppRegistry, View, Text } from 'react-native'
// import { Login } from './app/containers/Login'
// import { Remote } from './app/containers/Remote'


const Root = React.createClass({
  render(){
    return(
      <View>
        <Text>Hello</Text>
      </View>
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
