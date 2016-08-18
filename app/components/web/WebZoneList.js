import React from 'react'
import { ListView, TouchableHighlight, Text, View, StyleSheet, Animated, Easing } from 'react-native'
const pt = React.PropTypes

export const WebZoneList = React.createClass({
  PropTypes: {
    onZoneSelect: pt.func
  },
  getInitialState(){
    let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 })
    return {
      data: ds.cloneWithRows([]),
      pulse: new Animated.Value(8)
    }
  },
  componentDidMount(){
    this.runPulse()
    this.setState({
      data: this.state.data.cloneWithRows( this.props.data )
    })
    this.forceUpdate()
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
  componentWillReceiveProps(nextProps){
    this.setState({
      data: this.state.data.cloneWithRows( nextProps.data )
    })
  },
  setRowStyle(rowData){

    style = [ styles.rowContainer ]
    let lastRow = this.state.data.getRowData(0, this.state.data.getRowCount() - 1)
    if( rowData.name !== lastRow.name ){
      style.push(styles.rowDivider)
    }
    if (rowData.selected === true){
      style.push(styles.rowSelected)
    }
    else if (rowData.running.state === true){
      style.push(styles.rowRunning)
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
          { rowData.running.state && <View style={ styles.runningTextContainer} ><Animated.Text style={ [ styles.zoneRunningText, { fontSize: this.state.pulse } ] }> Zone Running </Animated.Text></View> }
        </View>
      </TouchableHighlight>

    )
  },
  render(){
    return(

      <ListView
        style={ { flex: 25 } }
        dataSource={ this.state.data }
        renderRow={ this.renderRow }
        />

    )
  }
})

const styles = StyleSheet.create({
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
