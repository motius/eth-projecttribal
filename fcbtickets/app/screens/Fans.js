import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {texts} from '../config/text';

export class Fans extends React.Component {
  static navigationOptions = {
    tabBarLabel: texts.fans.title,
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-people" size={24} color={tintColor} />
    )
  };

  render() {
    return <View style={{backgroundColor: 'red'}} />;
  }
}