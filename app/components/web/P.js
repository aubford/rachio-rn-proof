import React from 'react'

export const P = React.createClass({
  render(){
    return(
      <div style={this.props.style}>{this.props.children}</div>
    )
  }
})
