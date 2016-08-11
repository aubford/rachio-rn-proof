import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableHighlight } from 'react-native'

export const Login = React.createClass({
  getInitialState: function(){
    return {
      password: "",
      username: ""
    }
  },
  login: function(){
    if(this.state.password !== "" && this.state.username !== ""){

      this.props.navigator.push({
        title: 'Remote'
      })

    }
  },
  render(){
    return (
      <View style={ styles.screen }>

        <View style={ styles.logoContainer}>
          <Image source={ require('../../assets/images/rachio-logo.png') }
            style={ styles.logo }
            resizeMode={ 'contain' }
            />
        </View>

        <View style={ styles.loginContainer }>

          <TextInput
            value= { this.state.username }
            style={ styles.input }
            onChangeText={(username) => this.setState({ username })}
            placeholder="Username"
            />

          <TextInput
            value= { this.state.password }
            style={ styles.input }
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            />

        </ View>

        <View style={ styles.buttonsContainer }>

          <TouchableHighlight onPress={ this.login } >
            <View style={ styles.button } >
              <Text style={ styles.buttonText }>Log In</Text>
            </View>
          </TouchableHighlight>

        </View>

      </ View>
    )
  }
})


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#00283A"
  },
  logoContainer: {
    flex: 3,
    alignItems: "center",
    paddingTop: 10
  },
  loginContainer: {
    flex: 6,
    padding: 15
    },
  buttonsContainer: {
    flex: 2,
    padding: 15
  },
  input: {
    height:35,
    fontSize: 15,
    padding: 3,
    backgroundColor: "aliceblue",
    marginTop: 5,
    borderRadius: 5
  },
  logo: {
    width: 200
  },
  button: {
    height: 50,
    borderWidth: 1,
    borderColor: "chartreuse",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white"
  }
})
