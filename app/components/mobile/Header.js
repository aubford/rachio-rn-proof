import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Button } from './Button'
const pt = React.PropTypes

export const Header = React.createClass({
  propTypes: {
    text: pt.string
  },
  render(){
    return (
      <View
        style={ styles.header }>
        { Platform.OS == 'ios' && <Button
          text="Back"
          textStyle={ styles.backButtonText }
          onClick={ () => {
            this.props.navigator.pop()
          }}
          style={ styles.backButton }
          />}
        <Text style={ styles.headerText }> {this.props.text} </Text>
        { Platform.OS == 'ios' && <View
          style={ styles.backButton }
          /> }
      </View>
    )
  }
})


const styles = StyleSheet.create({
  header: {
    flex: 3,
    flexDirection: 'row',
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
    color: 'white',
    margin: 0
  },
  backButton: {
    width: null,
    flex: 1
  },
  backButtonText: {
    color: 'white'
  }
})
