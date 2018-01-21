import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {texts} from '../config/text';

export class MyTickets extends React.Component {
  static navigationOptions = {
    tabBarLabel: texts.home.myTicketsTabTitle,
  };

  render() {
    return <View style={{backgroundColor: 'red'}} />;
  }
}