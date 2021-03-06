import React from 'react';
import { Button } from '../components/component-switch'
import { RunZoneModal } from '../components/component-switch'
import { Header } from '../components/component-switch'
import { ZoneList } from '../components/component-switch'
import { Screen } from '../components/component-switch'
import { Section } from '../components/component-switch'
import { api, apiUtil } from '../api'
import { native, ios } from '../util'


export const Remote = React.createClass({
  getInitialState(){

    return {
      data: [],
      modalVisible: false,
      selectedTime: 1
    }

  },
  componentDidMount(){

    api.getDeviceInfo().then((res) => res.json()).then((res) => {
      this.setState({ data: apiUtil.initZones(res.zones) })
      this.setZoneStatus()
    })

     this.interval = setInterval(this.setZoneStatus, 2000)

  },
  setZoneStatus(){
    api.getEvents().then((res) => res.json()).then((res) => {
      let data = apiUtil.getZoneStatus(res, this.state.data)
      this.setState({
        data: data
      })
    })
  },
  componentWillUnmount(){
    clearInterval(this.interval)
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
    let data = this.state.data.slice()
    let selectedTime = this.state.selectedTime * 60
    let toApi = []
    data.forEach(function(zone, index){
      if(zone.selected === true){

        toApi.push({ id: zone.id, duration: selectedTime, sortOrder: toApi.length + 1 })
        data[index] = { ...zone, selected: false }

      }
    })
    api.runZones(toApi)

    this.setState({
      modalVisible: false,
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
          navigator={ this.props.navigator }
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
          onZoneSelect={ this.handleZoneSelect }
          data={ this.state.data }
          />

        { native &&
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
    backButton: {
      alignSelf: "flex-start",
      backgroundColor: "red",
      top: 0,
      left: 0
    },
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
