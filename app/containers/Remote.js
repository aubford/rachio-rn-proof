import React from 'react';
import { Platform } from 'react-native'
import { Button } from '../components/mobile/Button'
import { RunZoneModal } from '../components/mobile/RunZoneModal'
import { Header } from '../components/mobile/Header'
import { ZoneList } from '../components/mobile/ZoneList'
import { Screen } from '../components/mobile/Screen'
import { Section } from '../components/mobile/Section'
import { api } from '../api'

let WEBHOOK_URL = "ngrok.io...."


export const Remote = React.createClass({
  getInitialState(){
    api.get

    return {
      data: data,
      modalVisible: false,
      selectedTime: 1
    }
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
  runZones(){
    let _this = this
    let data = this.state.data.slice()
    let selectedTime = this.state.selectedTime

    data.forEach(function(zone, index){
      if(zone.selected === true){

        if(zone.running.state){
          clearTimeout(zone.running.timeoutID)
        }

        let timeoutFunc = (function(){

          let laterState = this.state.data.slice()
          laterState[index] = { ...laterState[index], running: { state: false, timeoutID: null } }

          this.setState({
            data: laterState
          })

        }).bind(_this)

        var timeOut = setTimeout(timeoutFunc, selectedTime * 1000)

        data[index] = { ...zone, selected: false, running: {state: true, timeoutID: timeOut} }

      }
    })

    this.setState({
      data: data,
      modalVisible: false
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
          style={ { flex: 1 }}
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
