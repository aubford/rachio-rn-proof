import React from 'react'
import { View } from 'react-native'
const pt = React.PropTypes

export default Section = React.createClass({

  propTypes: {
    style: pt.object
  },
  render(){
    return (
      <View style={ this.props.style }>
        { this.props.children }
       </View>
    )
  }

})
