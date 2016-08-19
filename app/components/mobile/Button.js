import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet, Platform } from 'react-native'
const pt = React.PropTypes

export const Button = React.createClass({

  propTypes: {
    style: pt.object,
    textStyle: pt.object,
    underlayColor: pt.string,
    text: pt.string,
    onPress: pt.func
  },

  render(){
    return (

      <TouchableHighlight style={ [ styles.button, { flexDirection: "row" }, this.props.style, { borderWidth: 0 } ] } onPress={ this.props.onClick } underlayColor={ this.props.underlayColor ? this.props.underlayColor : "rgba(3, 169, 244, .1)" }>
        <View
          style={ [ styles.button, this.props.style ] }>
          <Text style={ [ styles.buttonText, this.props.textStyle ] }> {this.props.text} </Text>
        </View>
      </ TouchableHighlight>

    )
  }
})

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,

    ...Platform.select({
      android: {
        backgroundColor: "#03A9F4"
      }
    })
  },
  buttonText: {
    color: "#03A9F4",
    fontSize: 14,
    
    ...Platform.select({
      android: {
        color: "white"
      }
    })
  }
})
