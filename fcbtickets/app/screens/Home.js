import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TabNavigator, TabView } from 'react-navigation';
import {BuyTickets, MyTickets} from '.';
import {NavBar} from '../components/NavBar';
import {colors} from '../config/colors';
import {texts} from '../config/text';

const TabNav = TabNavigator(
  {
    BuyTicketsTab: {
      screen: BuyTickets,
    },
    MyTicketsTab: {
      screen: MyTickets,
    },
  },{
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        backgroundColor: colors.primaryColor,
      },
      indicatorStyle: {
        backgroundColor: colors.white,
      },
      inactiveTintColor: colors.lightGray,
      activeTintColor: colors.white
    }
  }
);

export class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (<NavBar
        navigation={navigation}
        title={texts.appTitle}
      />
    )
  });

  constructor() {
    super();
  }

  render() {
    return <TabNav />
  }
}