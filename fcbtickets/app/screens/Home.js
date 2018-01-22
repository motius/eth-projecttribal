import React from 'react';
import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import { TabNavigator } from 'react-navigation';
import {Voting, Fans} from '.';
import {Merchandise} from "./Merchandise";
import {Tickets} from "./Tickets";
import {NavBar} from '../components/NavBar';
import {colors} from '../config/colors';
import {texts} from '../config/text';
import {images} from "../assets/index";

Platform.select({

});
const TabNav = TabNavigator(
  {
    VotingTab: {
      screen: Voting,
    },
    MerchandiseTab: {
      screen: Merchandise,
    },
    TicketsTab: {
      screen: Tickets,
    },
    FanTab: {
      screen: Fans,
    },
  },{
    swipeEnabled: true,
    animationEnabled: true,
    ...Platform.select({
      ios : {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          style: {
            backgroundColor: colors.white,
          },
          activeTintColor: colors.primaryColor
        }
      },
      android : {
        tabBarPosition: 'top',
        showIcon: true,
        upperCaseLabel: false,
        tabBarOptions: {
          style: {
            backgroundColor: colors.primaryColor,
          },
          labelStyle: {
            fontSize: 12,
          },
          indicatorStyle: {
            backgroundColor: colors.white,
          },
          activeTintColor: colors.white,
        }
      }
    }),
  }
);

export class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (<NavBar
        navigation={navigation}
        title={texts.home.title}
        titleIcon={images.bayernLogo}
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