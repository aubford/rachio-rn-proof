import React from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight, Modal, Picker, Platform } from 'react-native'
import global from '../styles/global'
import Button from '../components/Button'
import RunZoneModal from '../components/RunZoneModal'
import Header from '../components/Header'
import ZoneList from '../components/ZoneList'

let dataBlob = [
  {
    name: "Zone 1",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 2",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 3",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 4",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 5",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 6",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 7",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 8",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 9",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 10",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 11",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 12",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 13",
    selected: false,
    running: { state: false, timeoutID: null }
  },
  {
    name: "Zone 14",
    selected: false,
    running: { state: false, timeoutID: null }
  }
]

export const Remote = React.createClass({
  getInitialState(){
    let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 })
    return {
      dataBlob: dataBlob,
      data: ds.cloneWithRows([]),
      modalVisible: false,
      selectedTime: 1
    }
  },
  componentDidMount(){
    this.setState({
      data: this.state.data.cloneWithRows(this.state.dataBlob)
    })
  },
  handleZoneSelect(rowData, sectionID, rowID){
    let index = Number(rowID)
    let data = this.state.dataBlob.slice()

    data[index] = {
      ...data[index],
      selected: !data[index].selected
    }

    this.setState({
      dataBlob: data,
      data: this.state.data.cloneWithRows(data)
    })
  },
  handleRunSelectedZones(){
    this.setState({
      modalVisible: true
    })
  },
  handleSelectAll(){
    let data = this.state.dataBlob.slice()

    data.forEach(function(zone, index){
      data[index] = { ...zone, selected: true }
    })

    this.setState({
      dataBlob: data,
      data: this.state.data.cloneWithRows(data)
    })
  },
  runZones(){
    let _this = this
    let data = this.state.dataBlob.slice()
    let selectedTime = this.state.selectedTime

    data.forEach(function(zone, index){
      if(zone.selected === true){

        if(zone.running.state){
          clearTimeout(zone.running.timeoutID)
        }

        let timeoutFunc = (function(){

          let laterState = this.state.dataBlob.slice()
          laterState[index] = { ...laterState[index], running: { state: false, timeoutID: null } }

          this.setState({
            dataBlob: laterState,
            data: _this.state.data.cloneWithRows(laterState)
          })

        }).bind(_this)

        var timeOut = setTimeout(timeoutFunc, selectedTime * 1000)

        data[index] = { ...zone, selected: false, running: {state: true, timeoutID: timeOut} }

      }
    })

    this.setState({
      dataBlob: data,
      data: this.state.data.cloneWithRows(data),
      modalVisible: false
    })
  },
  cancelRun(){
    let data = this.state.dataBlob.slice()

    data.forEach(function(zone,index){
      data[index] = { ...zone, selected: false }
    })

    this.setState({
      modalVisible: false,
      dataBlob: data,
      data: this.state.data.cloneWithRows(data)
    })
  },
  render(){
    return (
      <View
      style={ global.screen }>

        <Header
          text="Remote Control"
          />

        <View
          style={ local.startZoneContainer }>
          <Button
            text="Run Selected Zones"
            onPress={ this.handleRunSelectedZones }
            />
          <Button
            text="Select All"
            onPress={ this.handleSelectAll }
            />
        </View>

        <ZoneList
          style={ { flex: 1 }}
          dataSource={ this.state.data}
          onZoneSelect={ this.handleZoneSelect }
          data={ this.state.data }
          renderRow={ this.renderRow }
          />

        <RunZoneModal
          modalVisible={ this.state.modalVisible }
          selectedValue={ this.state.selectedTime }
          onValueChange={ (value) => this.setState({ selectedTime: value }) }
          runZones={ this.runZones }
          cancelRun={ this.cancelRun}
          />

      </View>

    )
  }
})

const local = StyleSheet.create({
  startZoneContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: .5,
    borderTopWidth: .5,
    borderColor: "black"
  },
  zoneList: {
    flex: 25
  },
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
