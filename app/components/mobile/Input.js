import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
const pt = React.PropTypes

export default Input = React.createClass({
  propTypes: {
    value: pt.string,
    onChangeText: pt.func
  },
  render(){
    return(
      <TextInput
        value= { this.props.value }
        style={ styles.input }
        onChangeText={ this.props.onChangeText }
        placeholder= { this.props.placeholder }
        />
    )
  }
})

const styles = StyleSheet.create({
  input: {
    height:50,
    fontSize: 20,
    padding: 10,
    backgroundColor: "aliceblue",
    marginTop: 5,
    borderRadius: 5
  }
})
