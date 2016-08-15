import React from 'react'
import { ListView, TouchableHighlight, Text, View, StyleSheet, Animated, Easing } from 'react-native'
const pt = React.PropTypes

export default ZoneList = React.createClass({
  PropTypes: {
    onZoneSelect: pt.func,

  },
  getInitialState(){
    return {
      pulse: new Animated.Value(8)
    }
  },
  componentDidMount(){
    this.runPulse()
  },
  runPulse(){
    Animated.sequence([
      Animated.timing(
        this.state.pulse,
        {
          toValue: 9,
          duration: 200
        }
      ),
      Animated.timing(
        this.state.pulse,
        {
          toValue: 8,
          duration: 200
        }
      )

    ]).start( () => this.runPulse() )
  },
  setRowStyle(rowData){

    style = [ local.rowContainer ]
    let lastRow = this.props.data.getRowData(0, this.props.data.getRowCount() - 1)
    if( rowData.name !== lastRow.name ){
      style.push(local.rowDivider)
    }
    if (rowData.selected === true){
      style.push(local.rowSelected)
    }
    else if (rowData.running.state === true){
      style.push(local.rowRunning)
    }
    return style

  },
  renderRow(rowData, sectionID, rowID, highlightRow){

    return (

      <TouchableHighlight onPress={ () => this.props.onZoneSelect(rowData, sectionID, rowID) } underlayColor={"lightgrey"}>
        <View
          style={ this.setRowStyle(rowData) }
          >
          <Text style={{ flex:1 }}> { rowData.name } </Text>
          { rowData.running.state && <View style={ local.runningTextContainer} ><Animated.Text style={ [ local.zoneRunningText, { fontSize: this.state.pulse } ] }> Zone Running </Animated.Text></View> }
        </View>
      </TouchableHighlight>

    )
  },
  render(){
    return(

      <ListView
        style={ { flex: 25 } }
        dataSource={ this.props.data }
        renderRow={ this.renderRow }
        />

    )
  }
})


const local = StyleSheet.create({
  rowContainer: {
    padding: 20,
    flexDirection: "row"
  },
  rowDivider: {
    borderBottomWidth: .5,
    borderColor: "#B0BEC5"
  },
  rowSelected: {
    backgroundColor: "lightyellow"
  },
  rowRunning: {
    backgroundColor: "lightblue"
  },
  runningTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  zoneRunningText: {
    color: "blue"
  }
})
