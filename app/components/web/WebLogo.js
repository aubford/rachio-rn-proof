import React from 'react'
import { View, Image, StyleSheet } from 'react-native'


export const WebLogo = React.createClass({
  render(){
    return(
      <View style={ styles.logoContainer }>
        <Image source={ require('../../../assets/images/rachio-logo.png') }
          style={ styles.logo }
          resizeMode={ 'contain' }
          />
      </View>
    )
  }
})


const styles = StyleSheet.create({
  logoContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 200,
    alignSelf: "auto"
  }
})
