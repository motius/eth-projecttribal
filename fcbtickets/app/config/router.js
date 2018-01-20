'use strict';

import React from 'react';
import { Platform, BackAndroid, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';

// import { TypptDrawerNew } from './screens/TypptDrawer';

import {
  Home
} from '../screens';

const SplashScreen = ({navigation}) => null;

const screenWidth = Dimensions.get('window').width;

export const AppNavigator = StackNavigator(
  {
    home: { screen: Home },
    splashScreen: { screen: SplashScreen },
  },
  {
    initialRouteName: 'home',
    headerMode: Platform.select({ ios: 'float', android: 'screen' }),
    navigationOptions: {
      gesturesEnabled: false,
    }
    /*
     * Use modal on iOS because the card mode comes from the right,
     * which conflicts with the drawer example gesture
     */
    //mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
);

// export const Drawer = DrawerNavigator({
//   app: {
//     screen: ({ navigation, screenProps }) => {
//       return <AppNavigator navigation={addNavigationHelpers({
//         dispatch: screenProps.dispatch,
//         state: screenProps.nav.navState,
//         openDrawer: () => navigation.navigate('DrawerOpen'),
//         closeDrawer: () => navigation.navigate('DrawerClose'),
//       })} />;}
//   },
// },{
//   initialRouteName: 'app',
//   drawerWidth: Number(screenWidth / 100 * 75),
//   drawerPosition: 'left',
//   contentComponent: (props) => {
//     const len = props.screenProps.nav.navState.routes.length;
//     const selectedRoute = len > 0 ? props.screenProps.nav.navState.routes[len - 1].routeName : 'main';
//     return <TypptDrawerNew selectedRoute={selectedRoute} nav={props.screenProps.nav} dispatch={props.screenProps.dispatch} rootNavigation={props.navigation}/>;
//   }
// });

class AppWithNavigationState extends React.Component {
  props: {
    drawerEnabled: boolean,
    nav?: any,
    dispatch?: any,
  };

  static defaultProps = {
    drawerEnabled: false,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', function () {
      const nav = this.props.nav.navState;
      if (nav.routes.length === 1 &&
        (nav.routes[0].routeName === 'home'
          || nav.routes[0].routeName === 'login')) {
        return false;
      }
      // if (shouldCloseApp(nav)) return false
      this.props.dispatch({ type: 'Navigation/BACK' });
      return true;
    }.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  render() {
    // if (this.props.drawerEnabled) {
    //   return <Drawer screenProps={this.props} />;
    // } else {
    //   return <AppNavigator navigation={addNavigationHelpers({
    //     dispatch: this.props.dispatch,
    //     state: this.props.nav.navState,
    //     openDrawer: () => {},
    //     closeDrawer: () => {},
    //   })} />;
    // }
    return <AppNavigator navigation={addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav.navState,
      openDrawer: () => {},
      closeDrawer: () => {},
    })} />;
  }
}

export default connect((state, props) => {
  return { nav: state.routes };
})(AppWithNavigationState);
