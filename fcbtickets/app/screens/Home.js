import React from 'react';
import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import { TabNavigator } from 'react-navigation';
import {Voting, Fans} from '.';
import {Merchandise} from "./Merchandise";
import {Tickets} from "./Tickets";
import {NavBar} from '../components/NavBar';
import {colors} from '../config/colors';
import {texts} from '../config/text';
import {getUserObject} from '../actions/FanClubContract';
import { connect } from 'react-redux';

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

class HomeComponent extends React.Component {
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
    this.props.dispatch(getUserObject("0x563983c8a37308d9028e904c22bb7de3794492c2"));
  }

  render() {
    return <TabNav />
  }
}

export const Home = connect(
  state => ({
    user: state.fanclub.user,
  })
)(HomeComponent);