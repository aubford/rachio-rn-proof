import React from 'react';
import { Platform } from 'react-native'
import { Button } from '../components/mobile/Button'
import { RunZoneModal } from '../components/mobile/RunZoneModal'
import { Header } from '../components/mobile/Header'
import { ZoneList } from '../components/mobile/ZoneList'
import { Screen } from '../components/mobile/Screen'
import { Section } from '../components/mobile/Section'
import { api, apiUtil } from '../api'

let data = [
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

let interval

export const Remote = React.createClass({
  getInitialState(){

    return {
      data: [],
      modalVisible: false,
      selectedTime: 1
    }

  },
  setZoneStatus(){
    api.getEvents().then((res) => res.json()).then((res) => {
      this.setState({
        data: apiUtil.getZoneStatus(res, this.state.data)
      })
    })
  },
  componentDidMount(){

    api.getDeviceInfo().then((res) => res.json()).then((res) => {
      this.setState({ data: apiUtil.initZones(res.zones) })
      this.setZoneStatus()
    })

    interval = setInterval(this.setZoneStatus, 2000)

  },
  componentWillUnmount(){
    clearInterval(interval)
  },
  handleZoneSelect(rowData, sectionID, rowID){
    let index = Number(rowID)
    let data = this.state.data.slice()

    data[index] = {
      ...data[index],
      selected: !data[index].selected
    }

    this.setState({
      data: data
    })
  },
  handleRunSelectedZones(){
    this.setState({
      modalVisible: true
    })
  },
  handleSelectAll(){
    let data = this.state.data.slice()

    data.forEach(function(zone, index){
      data[index] = { ...zone, selected: true }
    })

    this.setState({
      data: data
    })
  },
  cancelRun(){
    let data = this.state.data.slice()

    data.forEach(function(zone,index){
      data[index] = { ...zone, selected: false }
    })

    this.setState({
      modalVisible: false,
      data: data
    })
  },
  render(){
    return (
      <Screen>

        <Header
          text="Remote Control"
          />

        <Section
          style={ styles.startZoneContainer }>
          <Button
            text="Run Selected Zones"
            onClick={ this.handleRunSelectedZones }
            />
          <Button
            text="Select All"
            onClick={ this.handleSelectAll }
            />
        </Section>

        <ZoneList
          style={ { flex: 1 } }
          onZoneSelect={ this.handleZoneSelect }
          data={ this.state.data }
          />

        {
        Platform &&
        Platform.OS !== 'web' &&

        <RunZoneModal
          modalVisible={ this.state.modalVisible }
          selectedValue={ this.state.selectedTime }
          onValueChange={ (value) => this.setState({ selectedTime: value }) }
          runZones={ this.runZones }
          cancelRun={ this.cancelRun}
          />
        }

      </Screen>

    )
  }
})

let styles = {
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
  }
