import React from 'react'
import { stl } from '../../util'
const pt = React.PropTypes

export const Button = React.createClass({

  propTypes: {
    style: pt.object,
    textStyle: pt.object,
    underlayColor: pt.string,
    text: pt.string,
    onPress: pt.func
  },
  getInitialState(){
    return {
      hover: false
    }
  },
  style(){
    return this.state.hover ?
      {backgroundColor: "rgba(255, 255, 148, .2)"} :
      {backgroundColor: "transparent"}

  },
  render(){
    return (

      <div style={{ ...stl( styles.button, this.props.style ), ...this.style() }} onMouseOver={()=>this.setState({hover: true})} onMouseOut={()=>this.setState({hover:false})} onClick={ this.props.onClick } >
          <p style={stl( styles.buttonText, this.props.textStyle )}> {this.props.text} </p>
      </div>

    )
  }
})

const styles = {
  button: {
    height: 70,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flexDirection: "row",
    border: "1px solid",
    cursor: "pointer"
  },
  buttonText: {
    color: "#03A9F4",
    fontSize: 14
  }
}
