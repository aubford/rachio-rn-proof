import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableHighlight, StatusBar } from 'react-native'
import global from '../styles/global'

export const Login = React.createClass({
  getInitialState: function(){
    return {
      password: "",
      username: ""
    }
  },
  componentDidMount(){
    StatusBar.setBarStyle("light-content")
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
      <View style={ [ global.screen, local.screen ] }>

        <View style={ local.logoContainer }>
          <Image source={ require('../../assets/images/rachio-logo.png') }
            style={ local.logo }
            resizeMode={ 'contain' }
            />
        </View>

        <View style={ local.loginContainer }>

          <TextInput
            value= { this.state.username }
            style={ local.input }
            onChangeText={(username) => this.setState({ username })}
            placeholder="Username"
            />

          <TextInput
            value= { this.state.password }
            style={ local.input }
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            />

        </ View>

        <View style={ local.buttonsContainer }>

          <TouchableHighlight onPress={ this.login } >
            <View style={ [ global.button, local.button ] } >
              <Text style={ local.buttonText }>Log In</Text>
            </View>
          </TouchableHighlight>

        </View>

      </ View>
    )
  }
})


const local = StyleSheet.create({
  screen: {
    backgroundColor: "#00283A"
  },
  logoContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
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
    height:50,
    fontSize: 20,
    padding: 10,
    backgroundColor: "aliceblue",
    marginTop: 5,
    borderRadius: 5
  },
  logo: {
    width: 200
  },
  button: {
    height: 50,
    width: null,
    borderWidth: 1,
    borderColor: "chartreuse"
  },
  buttonText: {
    color: "white"
  }
})
