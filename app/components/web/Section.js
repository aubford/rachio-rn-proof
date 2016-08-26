import React from 'react'
import { stl } from '../../util'
const pt = React.PropTypes

export const Section = React.createClass({

  propTypes: {
    style: pt.object
  },
  render(){
    return (
      <div style={stl( this.props.style )}>
        { this.props.children }
      </div>
    )
  }

})
