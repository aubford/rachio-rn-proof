import React from 'react'
import { View } from 'react-native'
const pt = React.PropTypes

export default Screen = React.createClass({
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
