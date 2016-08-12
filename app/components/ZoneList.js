import React from 'react'
import { ListView } from 'react-native'
const pt = React.PropTypes

export default ZoneLine = React.createClass({
  PropTypes: {

  },
  getInitialState: {
    let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 })
    return {
      data: ds.cloneWithRows([])
    }
  },
  componentDidMount(){
    this.setState({
      data: this.state.data.cloneWithRows(this.state.dataBlob)
    })
  },
  setRowStyle(rowData){

    style = [ local.rowContainer ]
    let lastRow = this.state.data.getRowData(0, this.state.data.getRowCount() - 1)
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

      <TouchableHighlight onPress={ () => this.handleZoneSelect(rowData, sectionID, rowID) } underlayColor={"lightgrey"}>
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
        style={ { flex:1 } }
        dataSource={ this.state.data }
        renderRow={ this.renderRow }
        />
    )
  }
})
