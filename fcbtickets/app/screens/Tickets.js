import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import {texts} from '../config/text';

export class Tickets extends React.Component {
  static navigationOptions = {
    tabBarLabel: texts.tickets.title,
    tabBarIcon: ({tintColor}) => (
      <Icon name="ticket" size={24} color={tintColor} />
    )
  };

  render() {
    return <View style={{backgroundColor: 'red'}} />;
  }
}