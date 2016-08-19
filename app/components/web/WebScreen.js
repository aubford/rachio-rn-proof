import React from 'react'
import { stl } from '../../util'
const pt = React.PropTypes

export const WebScreen = React.createClass({
  propTypes: {
    style: pt.object
  },

  render(){
    return (
      <div style={stl( { flex: 1 }, this.props.style )} >
        {this.props.children}
      </div>
    )
  }

})
