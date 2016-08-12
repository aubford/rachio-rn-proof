import React from 'react'
import { ListView, TouchableHighlight, Text, View, StyleSheet } from 'react-native'
const pt = React.PropTypes

export default ZoneList = React.createClass({
  PropTypes: {

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
          <Text> { rowData.name } </Text>
          { rowData.running.state && <Text style={local.zoneRunningText}> Zone Running </Text> }
        </View>
      </TouchableHighlight>

    )
  },
  render(){
    return(

      <ListView
        style={ { flex: 1 } }
        dataSource={ this.props.data }
        renderRow={ this.renderRow }
        />

    )
  }
})

const local = StyleSheet.create({
  rowContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"
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
  zoneRunningText: {
    color: "blue",
    fontSize: 8
  }
})
