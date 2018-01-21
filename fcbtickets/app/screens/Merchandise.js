import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {texts} from '../config/text';

export class Merchandise extends React.Component {
  static navigationOptions = {
    tabBarLabel: texts.merchandise.title,
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-shirt" size={24} color={tintColor} />
    )
  };

  render() {
    return <View style={{backgroundColor: 'red'}} />;
  }
}