import React from 'react'
import { View, TouchableHighlight, Text, Picker, StyleSheet, Modal, Platform } from 'react-native'
import { Button } from './Button'
const pt = React.PropTypes

export const RunZoneModal = React.createClass({
  PropTypes: {
    modalVisible: pt.bool,
    selectedValue: pt.number,
    onValueChange: pt.func,
    runZones: pt.func,
    cancelRun: pt.func
  },
  render(){

    return (

      <Modal
        visible={ this.props.modalVisible }
        >

        <View style={ styles.pickerContainer } >
          <Picker
            selectedValue={ this.props.selectedValue }
            onValueChange={ this.props.onValueChange }
            style= { styles.picker }
            >
            {
              timeGenerator().map(function(time){
                return (<Picker.Item key={ time.value } label={ time.label } value={ time.value } />)
              })
            }
          </Picker>
        </View>

        <View style={ styles.modalButtonContainer } >
          <Button
            text="Run Zones"
            onClick={ this.props.runZones }
            />
          <Button
            text="Cancel"
            onClick={ this.props.cancelRun }
            />
        </View>

      </Modal>

    )
  }
})

function timeGenerator(){
  let output = [{ label: "1 Minute", value: 1 }]
  for(var i=2; i < 10; i++){
    output.push({label: i + " Minutes", value: i})
  }
  for(var i=10; i < 60; i+=5){
    output.push({label: i + " Minutes", value: i})
  }
  for(var i=60; i < 480; i+=60){
    output.push({label: (i / 60) + " Hours", value: i})
  }
  return output
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  picker: {
    width: 250
  },
  modalButtonContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 100,
    ...Platform.select({
      android: {
        justifyContent: "space-around"
      }
    })
  }
})
