import { defaults } from './styles/web'
import { Platform, StatusBar } from 'react-native'

export var native = Platform && Platform.OS == 'android' || Platform && Platform.OS == 'ios'

export function stl(){
  let args = [...arguments]
  let styles = {}

  args.forEach(function(e){
    styles = { ...styles, ...e }
  })

  return { ...defaults, ...styles }
}

export function platformSelect(input){
  return native ? Platform.select(input) : {}
}

export function lightStatusBar(){
  if(native){
    StatusBar.setBarStyle('light-content')
  }
}

export function setCred(key, value){
  if(native){

  }else{
    localStorage.setItem(key, value)
  }
}

export function getCred(key, value){
  if(native){

  }else{
    localStorage.getItem(key, value)
  }
}
