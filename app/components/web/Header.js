import React from 'react'
import { stl } from '../../util'
const pt = React.PropTypes

export const Header = React.createClass({
  propTypes: {
    text: pt.string
  },
  render(){
    return (
      <div
        style={ stl(styles.header) }>
        <p style={ stl(styles.headerText) }> {this.props.text} </p>
      </div>
    )
  }
})


const styles = {
  header: {
    flex: 2,
    backgroundColor: "#03A9F4",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 40,
    color: "white"
  }
}
