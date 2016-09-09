import React from 'react'
import { ListView, TouchableHighlight, Text, View, StyleSheet, Animated, Easing } from 'react-native'
let SortableListView = require('react-native-sortable-listview')

const pt = React.PropTypes

let RowComponent = React.createClass({
  render(data, sectionID, rowID){
    return(
      <TouchableHighlight onPress={ () => this.props.onZoneSelect(this.props.data, sectionID, rowID) } underlayColor={"lightgrey"} { ...this.props.sortHandlers }>
        <View
          style={ this.props.style }
          >
          <Text style={{ flex:1 }}> { this.props.data.name } </Text>
          { this.props.data.running && <View style={ styles.runningTextContainer } ><Animated.Text style={ [ styles.zoneRunningText, { fontSize: this.state.pulse } ] }> Zone Running </Animated.Text></View> }
        </View>
      </TouchableHighlight>
    )
  }
})

function objectify(array){
  obj = {}
  count = 0
  array.forEach(function(e){
    k = count.toString()
    obj[k] = e
    count++
  })
  return obj
}

export const ZoneList = React.createClass({
  PropTypes: {
    onZoneSelect: pt.func
  },
  getInitialState(){
    return {
      data: {},
      pulse: new Animated.Value(8),
      order: []
    }
  },
  componentDidMount(){
    this.runPulse()

    let data = objectify(this.props.data)
    this.setState({
      data: data,
      order: Object.keys(data)
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
    let data = objectify(nextProps.data)
    this.setState({
      data: data,
      order: Object.keys(data)
    })
  },
  setRowStyle(rowData){
    let style = [ styles.rowContainer ]
    if (rowData.selected === true){
      style.push(styles.rowSelected)
    }
    if (rowData.running === true){
      style.push(styles.rowRunning)
    }
    return style

  },
  renderRow(rowData, sectionID, rowID, highlightRow){
    return (

      <TouchableHighlight onPress={ () => this.props.onZoneSelect(rowData, sectionID, rowID) } underlayColor={"lightgrey"} { ...this.props.sortHandlers }>
        <View
          style={ this.setRowStyle(rowData) }
          >
          <Text style={{ flex:1 }}> { rowData.name } </Text>
          { rowData.running && <View style={ styles.runningTextContainer } ><Animated.Text style={ [ styles.zoneRunningText, { fontSize: this.state.pulse } ] }> Zone Running </Animated.Text></View> }
        </View>
      </TouchableHighlight>

    )
  },
  render(){
    return(
      <View style={{ flex: 25 }}>
        <SortableListView
          data={ this.state.data }
          order={ this.state.order }
          onRowMoved={e => {
            let order = this.state.order.slice()

            order.splice(e.to, 0, order.splice(e.from, 1)[0])
            this.setState({
              order: order
            })
            this.forceUpdate()
          }}
          renderRow={ row => <RowComponent data={row} style={ this.setRowStyle(this.props.data) }/> }
          />
      </View>
    )
  }
})




const styles = StyleSheet.create({
  rowContainer: {
    padding: 20,
    flexDirection: "row",
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
