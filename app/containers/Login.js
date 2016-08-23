import React from 'react'
import { browserHistory } from 'react-router'
import { Platform, StatusBar } from 'react-native'


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

if ( Platform && Platform.OS === 'web' ){
  var Buttony = WebButton
  var Sectiony = WebSection
  var Screeny = WebScreen
  var Logoy = WebLogo
  var Inputy = WebInput
}else{
  var Buttony = Button
  var Sectiony = Section
  var Screeny = Screen
  var Logoy = Logo
  var Inputy = Input
}

export const Login = React.createClass({
  getInitialState(){
    return {
      password: "",
      username: ""
    }
  },
  componentDidMount(){
    if ( Platform && Platform.OS !== 'web' ){
      StatusBar.setBarStyle("light-content")
    }
  },
  login(){
    if(this.state.password !== "" && this.state.username !== ""){
      if( Platform && Platform.OS !== 'web'){
        this.props.navigator.push({
          title: 'Remote'
        })
      }else{
        browserHistory.push( '/remote' )
      }
    }
  },
  handleInputChange(evt, type){
    let update = {}
    update[type] = evt.target && evt.target.value ? evt.target.value : evt
    this.setState( update )
  },
  render(){
    return (
      <Screeny style={ styles.screen }>

        <Logoy />

        <Sectiony style={ styles.inputContainer }>

          <Inputy
            value= { this.state.username }
            onChange={ (evt) => this.handleInputChange(evt, "username") }
            placeholder="Username"
            />

          <Inputy
            value= { this.state.password }
            onChange={ (evt) => this.handleInputChange(evt, "password") }
            placeholder="Password"
            />

        </Sectiony>

        <Sectiony style={ styles.buttonsContainer }>

          <Buttony
            text="Log In"
            textStyle={ styles.buttonText }
            style={ styles.button }
            underlayColor={ "chartreuse" }
            onClick={ this.login }
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
  inputContainer: {
    flex: 6,
    padding: 15,
    alignItems: "center",

    ...Platform.select({
      web: {
        flex: 1,
        justifyContent: "center"
      },
      android: {
        alignItems: "stretch"
      }
    })
  },
  buttonsContainer: {
    flex: 2,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    flex: 1,

    ...Platform.select({
      web: {
        flex: null,
        borderWidth: 2,
        borderColor: "chartreuse"
      },
      ios: {
        borderWidth: 2,
        borderColor: "chartreuse"
      }
    })
  },
  buttonText: {
    color: "white"
  }
}
