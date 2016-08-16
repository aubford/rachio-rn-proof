import React from 'react'
import { StyleSheet,StatusBar, Platform } from 'react-native'
import Button from '../components/mobile/Button'
import Section from '../components/mobile/Section'
import Screen from '../components/mobile/Screen'
import Logo from '../components/mobile/Logo'
import Input from '../components/mobile/Input'

export const Login = React.createClass({
  getInitialState: function(){
    return {
      password: "",
      username: ""
    }
  },
  componentDidMount(){
    if ( Platform.OS ){
      StatusBar.setBarStyle("light-content")
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
      <Screen style={ styles.screen }>

        <Logo />

        <Section style={ styles.loginContainer }>

          <Input
            value= { this.state.username }
            onChangeText={(username) => this.setState({ username })}
            placeholder="Username"
            />

          <Input
            value = { this.state.password }
            onChangeText = { ( password ) => this.setState({ password }) }
            placeholder="Password"
            />

        </Section>

        <Section style={ styles.buttonsContainer }>

          <Button
            text="Log In"
            textStyle={ styles.buttonText }
            style={ styles.button }
            underlayColor={ "chartreuse" }
            onPress={ this.login }
            />

        </Section>

      </ Screen>
    )
  }
})

const styles = {
  screen: {
    backgroundColor: "#00283A"
  },
  loginContainer: {
    flex: 6,
    padding: 15
  },
  buttonsContainer: {
    flex: 2,
    padding: 15,
    flexDirection: "row"
  },
  button: {
    height: 50,
    width: null,
    flex: 1,
    borderWidth: 1,
    borderColor: "chartreuse"
  },
  buttonText: {
    color: "white"
  }
}
