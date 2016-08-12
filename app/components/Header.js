import React from 'react'
import { View, Text } from 'react-native'
import global from '../styles/global'
const pt = React.PropTypes

export default Header = React.createClass({
  propTypes: {
    text: pt.string
  },
  render(){
    return (
      <View
        style={ global.header }>
        <Text style={ global.headerText }> {this.props.text} </Text>
      </View>
    )
  }
})
