import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import global from '../styles/global'
const pt = React.PropTypes


export default Button = React.createClass({

  propTypes: {
    style: pt.number,
    underlayColor: pt.string,
    textStyle: pt.number,
    text: pt.string,
    onPress: pt.func
  },

  render(){
    return (

      <TouchableHighlight style={ [ global.button, { flexDirection: "row" }, this.props.style, { borderWidth: 0 } ] } onPress={ this.props.onPress } underlayColor={ this.props.underlayColor ? this.props.underlayColor : "rgba(3, 169, 244, .1)" }>
        <View
          style={ [ global.button, this.props.style ] }>
          <Text style={ [ global.buttonText, this.props.textStyle ] }> {this.props.text} </Text>
        </View>
      </ TouchableHighlight>

    )
  }
})
