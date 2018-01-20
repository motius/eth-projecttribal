import React from 'react';
import {View, StatusBar } from 'react-native';
import AppWithNavigationState from './config/router'

export class AppContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (<View style={{flex: 1}}>
      {/*<StatusBar barStyle="light-content" translucent={true} backgroundColor='rgba(0,0,0,0)'/>*/}
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <AppWithNavigationState drawerEnabled={false}/>
      {/*<DeviceController />*/}
    </View>);
  }
}