import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
const pt = React.PropTypes

export default Header = React.createClass({
  propTypes: {
    text: pt.string
  },
  render(){
    return (
      <View
        style={ styles.header }>
        <Text style={ styles.headerText }> {this.props.text} </Text>
      </View>
    )
  }
})


const styles = StyleSheet.create({
  header: {
    flex: 3,
    backgroundColor: "#03A9F4",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios:{
        paddingTop: 20
      }
    })
  },
  headerText: {
    fontSize: 30,
    color: "white"
  }
})
