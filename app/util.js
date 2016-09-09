import { defaults } from './styles/web'
import { Platform, StatusBar, AsyncStorage } from 'react-native'

export var native = Platform && Platform.OS == 'android' || Platform && Platform.OS == 'ios'
export var ios = Platform && Platform.OS == 'ios'

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

export function setItem(key, value){
  if(native){
    AsyncStorage.setItem(key, value)
  }else{
    localStorage.setItem(key, value)
  }
}

export function getItem(key){
  if(native){
    AsyncStorage.getItem(key)
  }else{
    console.log("h", typeof key)
    return localStorage.getItem(key)
  }
}
