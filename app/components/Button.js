import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import global from '../styles/global'
const pt = React.PropTypes


export default Button = React.createClass({
  propTypes: {
    style: pt.object,
    underlayColor: pt.string,
    textStyle: pt.object,
    text: pt.string
  },

  render(){
    return (

      <TouchableHighlight style={ [ global.button, this.props.style ] } onPress={ this.props.onPress } underlayColor={ this.props.underlayColor ? this.props.underlayColor : "rgba(3, 169, 244, .1)" }>
        <View
          style={ [ global.button, this.props.style ] }>
          <Text style={ [ global.buttonText, this.props.textStyle ] }> {this.props.text} </Text>
        </View>
      </ TouchableHighlight>

    )
  }
})
