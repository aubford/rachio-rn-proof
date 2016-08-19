import React from 'react'
import { stl } from '../util'

export const WebApp = React.createClass({
  render(){
    return (
      <div style={stl( styles )}>
        {this.props.children}
      </div>
    )
  }
})

const styles = {
  height: "100vh"
}
