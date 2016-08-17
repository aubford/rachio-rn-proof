import React from 'react'
import { View } from 'react-native'
const pt = React.PropTypes

export const Screen = React.createClass({
  propTypes: {
    style: pt.object
  },

  render(){
    return (
      <View style={[ { flex: 1 }, this.props.style ]} >
        {this.props.children}
      </View>
    )
  }

})
