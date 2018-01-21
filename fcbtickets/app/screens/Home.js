import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { TabNavigator, TabView } from 'react-navigation';
import {Voting, Fans} from '.';
import {NavBar} from '../components/NavBar';
import {colors} from '../config/colors';
import {texts} from '../config/text';
import {getUserObject} from '../actions/FanClubContract';

const TabNav = TabNavigator(
  {
    VotingTab: {
      screen: Voting,
    },
    FanTab: {
      screen: Fans,
    },
  },{
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: colors.white,
      },
      activeTintColor: colors.primaryColor
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

  componentDidMount() {
    getUserObject("0x563983c8a37308d9028e904c22bb7de3794492c2").then(res => {
      console.log(res)
    })
  }

  render() {
    return <TabNav />
  }
}