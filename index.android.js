import React from 'react';
import { AppRegistry } from 'react-native';
import { Root } from './app/containers/Root';

const RachioRN = React.createClass(
  render() {
    return (
      <Root />
    )
  }
)

AppRegistry.registerComponent('rachioRN', () => RachioRN);
