import React from 'react'
import { browserHistory } from 'react-router'
import { api, apiUtil } from '../api'
import { native, platformSelect, lightStatusBar, setItem, getItem } from '../util'

import { Button } from '../components/component-switch'
import { Section } from '../components/component-switch'
import { Screen } from '../components/component-switch'
import { Logo } from '../components/component-switch'
import { Input } from '../components/component-switch'
import { P } from '../components/component-switch'


export const Login = React.createClass({
  getInitialState(){
    return {
      password: "",
      username: "",
      showValidation: false
    }
  },
  componentDidMount(){
    lightStatusBar()

    if( !native && getItem('rachioRnUsername') ){
      this.setState({
        password: getItem('rachioRnPassword'),
        username: getItem('rachioRnUsername')
      })
    }

    if( native ){
      Promise.all([ getItem('rachioRnUsername'), getItem('rachioRnPassword') ])
      .then((res) => {
        if(res[0]){
          this.setState({
            username: res[0],
            password: res[1]
          })
        }
      })
    }

  },
  login(){
    if(this.state.password !== "" && this.state.username !== ""){
      api.login(this.state.username, this.state.password).then((res)=> {
        if(res.username === this.state.username){

          setItem('rachioRnUsername', res.username)
          setItem('rachioRnPassword', this.state.password)
          this.setState({ showValidation: false})

          if( native ){
            this.props.navigator.push({
              title: 'Remote'
            })
          }else{
            browserHistory.push( '/remote' )
          }

        }else{
          this.setState({ showValidation: true})
        }
      })
    }
  },
  handleInputChange(evt, type){
    let update = {}
    update[type] = evt.target ? evt.target.value : evt
    this.setState( update )
  },
  render(){
    return (
      <Screen style={ styles.screen }>

        <Logo />

        <Section style={ styles.inputContainer }>

          { this.state.showValidation && <P style={styles.validation}>Bad Credentials</P> }
          <Input
            value={ this.state.username }
            onChange={ (evt) => this.handleInputChange(evt, "username") }
            placeholder="Username"
            />

          <Input
            value= { this.state.password }
            onChange={ (evt) => this.handleInputChange(evt, "password") }
            placeholder="Password"
            />


        </Section>

        <Section style={ styles.buttonsContainer }>

          <Button
            text="Log In"
            textStyle={ styles.buttonText }
            style={ styles.button }
            underlayColor={ "chartreuse" }
            onClick={ this.login }
            />

        </Section>

      </Screen>
    )
  }
})

const styles = {
  screen: {
    backgroundColor: "#00283A"
  },
  validation: {
    color: "red",
    position: "absolute",
    top: 15,
    ...platformSelect({
      ios: {
        top: 0
      },
      android: {
        top: 0
      }
    })
  },
  inputContainer: {
    flex: 1,
    padding: 15,
    position: 'relative',
    alignItems: "center",
    justifyContent: "center",

    ...platformSelect({
      ios: {
        flex: 6,
        justifyContent: "flex-start"
      },
      android: {
        flex: 6,
        justifyContent: "flex-start",
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
    borderWidth: 2,
    borderColor: "chartreuse",

    ...platformSelect({
      android: {
        flex: 1
      },
      ios: {
        flex: 1,
        borderWidth: 2,
        borderColor: "chartreuse"
      }
    })
  },
  buttonText: {
    color: "white"
  }
}
