import React from 'react'
import { stl } from '../../util'


export const WebLogo = React.createClass({
  render(){
    return(
      <div style={stl( styles.logoContainer )}>
        <img src={ require('../../../assets/images/rachio-logo.png') }
          style={stl( styles.logo )}
          />
      </div>
    )
  }
})


const styles = {
  logoContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  logo: {
    width: 300
  }
}
