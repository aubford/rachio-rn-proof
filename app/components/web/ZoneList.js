import React from 'react'
import { stl } from '../../util'

export const ZoneList = React.createClass({
  render(){
    return(
      <div style={ stl(styles.main)}>
        <p style={ stl(styles.p)}>Zone</p>
        <p style={ stl(styles.p)}>Zone</p>
        <p style={ stl(styles.p)}>Zone</p>
        <p style={ stl(styles.p)}>Zone</p>
        <p style={ stl(styles.p)}>Zone</p>
        <p style={ stl(styles.p)}>Zone</p>
        <p style={ stl(styles.p)}>Zone</p>
      </div>
    )
  }
})

const styles = {
  main: {
    flex: 8
  },
  p: {
    fontSize: 30,
    marginLeft: 100
  }
}
