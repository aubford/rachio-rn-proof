import React from 'react'
import { stl } from '../../util'
const pt = React.PropTypes

export const Input = React.createClass({
  propTypes: {
    value: pt.string,
    onChange: pt.func
  },
  render(){
    return(
      <input
        value= { this.props.value }
        style={ stl( styles ) }
        onChange={ this.props.onChange }
        placeholder= { this.props.placeholder }
        />
    )
  }
})

const styles = {
    height: 50,
    width: 350,
    fontSize: 20,
    padding: 10,
    backgroundColor: "aliceblue",
    marginTop: 5,
    borderRadius: 5
}
