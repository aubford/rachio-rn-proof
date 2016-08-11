import React from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight, Modal, Picker } from 'react-native'


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
  setRowStyle(rowData){

    style = [ styles.rowContainer ]
    let lastRow = this.state.data.getRowData(0, this.state.data.getRowCount() - 1)
    if( rowData.name !== lastRow.name ){
      style.push(styles.rowDivider)
    }
    if (rowData.selected === true){
      style.push(styles.rowSelected)
    }
    else if (rowData.running === true){
      style.push(styles.rowRunning)
    }
    return style

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
  renderRow(rowData, sectionID, rowID, highlightRow){
    return (
      <TouchableHighlight onPress={ () => this.handleZoneSelect(rowData, sectionID, rowID) } underlayColor={"lightgrey"}>
        <View
          style={ this.setRowStyle(rowData) }
          >
          <Text> { rowData.name } </Text>
          {rowData.running && <Text style={styles.zoneRunningText}> Zone Running </Text>}
        </View>
      </TouchableHighlight>
    )
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
    let dataOff = this.state.dataBlob.slice()
    let selectedTime = this.state.selectedTime

    data.forEach(function(zone, index){
      if(zone.selected === true){

        data[index] = { ...zone, selected: false, running: true }
        dataOff[index] = { ...zone, selected: false, running: false }

        

      }
    })

    this.setState({
      dataBlob: data,
      data: this.state.data.cloneWithRows(data),
      modalVisible: false
    })

    setTimeout(function(){
      _this.setState({
        dataBlob: dataOff,
        data: _this.state.data.cloneWithRows(dataOff)
      })
    }, selectedTime * 1000)

  },
  cancelZones(){

    let data = this.state.dataBlob.slice()

    data.forEach(function(zone,index){
      data[index] = { ...zone, selected: false }
    })

    this.setState({
      modalVisible: false
    })
  },
  render(){
    return (
        <View
        style={ styles.screen }>

        <View
          style={ styles.header }>
          <Text style={styles.headerText}>Remote Control</Text>
        </View>

        <View
          style={ styles.startZoneContainer }>

          <TouchableHighlight style={ styles.button } onPress={ this.handleRunSelectedZones } underlayColor={"rgba(3, 169, 244, .1)"}>
            <View
              style={ styles.button }>
              <Text style={ styles.buttonText }> Run Selected Zones</Text>
            </View>
          </ TouchableHighlight>

          <TouchableHighlight style={ styles.button } onPress={ this.handleSelectAll } underlayColor={"rgba(3, 169, 244, .1)"}>
            <View
              style={ styles.button }>
              <Text style={ styles.buttonText }> Select All</Text>
            </View>
          </ TouchableHighlight>

        </View>

        <ListView
          style={ styles.zoneList }
          dataSource={ this.state.data }
          renderRow={ this.renderRow }
        />

        <Modal
          visible={this.state.modalVisible}
          >

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.selectedTime}
              onValueChange={(value) =>  this.setState({ selectedTime: value })}>
              {
                timeGenerator().map(function(time){
                  return (<Picker.Item key={ time.value } label={ time.label } value={ time.value } />)
                })
              }
            </Picker>
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableHighlight style={ styles.button } onPress={ this.runZones } underlayColor={"rgba(3, 169, 244, .1)"}>
              <View style={ styles.button }>
                <Text style={ styles.buttonText }>Run Zones</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={ styles.button } onPress={ this.cancelZones } underlayColor={"rgba(3, 169, 244, .1)"}>
              <View style={ styles.button }>
                <Text style={ styles.buttonText }>Cancel</Text>
              </View>
            </TouchableHighlight>
          </View>

        </Modal>

      </View>
    )
  }
})

function timeGenerator(){
  let output = [{ label: "1 Minute", value: 1 }]
  for(i=2; i < 10; i++){
    output.push({label: i + " Minutes", value: i})
  }
  for(i=10; i < 60; i+=5){
    output.push({label: i + " Minutes", value: i})
  }
  for(i=60; i < 480; i+=60){
    output.push({label: (i / 60) + " Hours", value: i})
  }
  return output
}

const times = timeGenerator()

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  header: {
    flex: 3,
    backgroundColor: "#03A9F4",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10
  },
  startZoneContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "black"
  },
  headerText: {
    fontSize: 30,
    color: "white"
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
    backgroundColor: "yellow"
  },
  rowRunning: {
    backgroundColor: "lightblue"
  },
  button: {
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#03A9F4",
    fontSize: 14
  },
  modalButtonContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  pickerContainer: {
    flex: 2,
    justifyContent: "center"
  },
  zoneRunningText: {
    color: "blue",
    fontSize: 8
  }
})
