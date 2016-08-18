import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { browserHistory } from 'react-router'

import { Button } from '../components/mobile/Button'
import { Section } from '../components/mobile/Section'
import { Screen } from '../components/mobile/Screen'
import { Logo } from '../components/mobile/Logo'
import { Input } from '../components/mobile/Input'

import { WebButton } from '../components/web/WebButton'
import { WebSection } from '../components/web/WebSection'
import { WebScreen } from '../components/web/WebScreen'
import { WebLogo } from '../components/web/WebLogo'
import { WebInput } from '../components/web/WebInput'

if ( Platform.OS === 'web' ){
  var Buttony = WebButton
  var Sectiony = WebSection
  var Screeny = WebScreen
  var Logoy = WebLogo
  var Inputy = WebInput
}

export const Login = React.createClass({
  getInitialState: function(){
    return {
      password: "",
      username: ""
    }
  },
  componentDidMount(){
    if ( Platform.OS !== 'web' ){
      StatusBar.setBarStyle("light-content")
    }
  },
  login: function(){
    if(this.state.password !== "" && this.state.username !== ""){
      if( Platform.OS !== 'web'){
        this.props.navigator.push({
          title: 'Remote'
        })
      }else{
        browserHistory.push( '/remote' )
      }
    }
  },
  render(){
    return (
      <Screeny style={ styles.screen }>

        <Logoy />

        <Sectiony style={ styles.loginContainer }>

          <Inputy
            value= { this.state.username }
            onChangeText={(username) => this.setState({ username })}
            placeholder="Username"
            />

          <Inputy
            value = { this.state.password }
            onChangeText = { ( password ) => this.setState({ password }) }
            placeholder="Password"
            />

        </Sectiony>

        <Sectiony style={ styles.buttonsContainer }>

          <Buttony
            text="Log In"
            textStyle={ styles.buttonText }
            style={ styles.button }
            underlayColor={ "chartreuse" }
            onPress={ this.login }
            />

        </Sectiony>

      </ Screeny>
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
