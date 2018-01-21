// @flow
'use strict';

// import _ from 'lodash';

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../config/router';

export const type = {
  navigate: 'Navigation/NAVIGATE',
  reset: 'Navigation/RESET',
  back: 'Navigation/BACK',
  confirmBet: 'confirmBet',
  forceUpdateRequired: 'forceUpdateRequired',
};

const defaultAction = AppNavigator.router.getActionForPathAndParams('home');
const defaultState = AppNavigator.router.getStateForAction(defaultAction);

const initialState = {
  navState: defaultState,
  forceUpdateRequired: false,
};

// function isForceUpdateRequired(navState) {
//   return navState.index == 0 && navState.routes[0].routeName == 'main';
// }

export function reducer(state = initialState, action) {
  let navState;
  switch (action.type) {
    // case type.navigate: {
    //   const lastRoute = state.navState.routes[state.navState.routes.length - 1];
    //   if (lastRoute.routeName == action.routeName) {
    //     // Prevents double clicks to trigger the same navigation action twice
    //     return state;
    //   }
    //   navState = AppNavigator.router.getStateForAction(action, state.navState);
    //   return {
    //     ...state,
    //     navState,
    //   };
    // }
    // case type.back: {
    //   navState = AppNavigator.router.getStateForAction(action, state.navState);
    //   const forceUpdateRequired = isForceUpdateRequired(navState);
    //   return {
    //     ...state,
    //     navState,
    //     forceUpdateRequired,
    //   };
    // }
    // case type.reset: {
    //   navState = AppNavigator.router.getStateForAction(action, state.navState);
    //   const forceUpdateRequired = isForceUpdateRequired(navState);
    //   return {
    //     ...state,
    //     navState,
    //     forceUpdateRequired,
    //   };
    // }
    // case type.forceUpdateRequired: {
    //   return {
    //     ...state,
    //     forceUpdateRequired: action.value,
    //   };
    // }
    // case betTypes.addBet: {
    //   const key = state.navState.routes.find(r => r.routeName == 'groupBet');
    //   const setParamsAction = NavigationActions.setParams({
    //     params: {bet: action.value.pk, fixture: action.value.fixture},
    //     key: key.key,
    //   });
    //   navState = AppNavigator.router.getStateForAction(setParamsAction, state.navState);
    //   return {
    //     ...state,
    //     navState,
    //   };
    // }
    // case betTypes.addFixtureAndBet: {
    //   const key = state.navState.routes.find(r => r.routeName == 'groupBet');
    //   const setParamsAction = NavigationActions.setParams({
    //     params: {bet: action.value.bet.pk, fixture: action.value.fixture.pk},
    //     key: key.key,
    //   });
    //   navState = AppNavigator.router.getStateForAction(setParamsAction, state.navState);
    //   return {
    //     ...state,
    //     navState,
    //   };
    // }
    // case groupTypes.updateGroup: {
    //   const key = state.navState.routes.find(r => r.routeName == 'groupFeed');
    //   if (key) {
    //     const params = {group: action.value.pk, groupData: action.value};
    //     const setParamsAction = NavigationActions.setParams({
    //       params,
    //       key: key.key,
    //     });
    //     navState = AppNavigator.router.getStateForAction(setParamsAction, state.navState);
    //     return {
    //       ...state,
    //       navState,
    //     };
    //   }
    //   return state;
    // }
    // case groupTypes.deleteGroup: {
    //   let inGroupView = false;
    //   if (state.navState.routes.length > 0) {
    //     const route = state.navState.routes.find(r => r.routeName == 'groupFeed');
    //     if (route && route.params && route.params.group == action.value.pk) {
    //       inGroupView = true;
    //     }
    //   }
    //   if (!inGroupView) {
    //     return state;
    //   }
    //   const resetAction = NavigationActions.reset({
    //     index: 0,
    //     actions: [
    //       NavigationActions.navigate({ routeName: 'main'})
    //     ]
    //   });
    //   navState = AppNavigator.router.getStateForAction(resetAction, state.navState);
    //   return {
    //     ...state,
    //     navState,
    //     forceUpdateRequired: true,
    //   };
    // }
    // case userTypes.logout: {
    //   if (state.navState.routes.find(r => r.routeName == 'login')) {
    //     return state;
    //   }
    //   const loginAction = NavigationActions.reset({
    //     index: 0,
    //     actions: [
    //       NavigationActions.navigate({routeName: 'login'})
    //     ]
    //   });
    //   navState = AppNavigator.router.getStateForAction(loginAction, state.navState);
    //   return {
    //     ...state,
    //     navState,
    //   };
    // }
    default:
      return state;
  }
}
