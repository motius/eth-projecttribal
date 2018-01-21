'use strict';

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform, Image, Dimensions, Text} from 'react-native';
import {colors} from '../config/colors';
// import {utils} from '../utils';

export type NavBarElement = {
  element?: any,
  icon?: Icon,
  label?: string,
  action?: () => void,
}

export class NavBar extends React.Component {

  props: {
    navigation: any,
    backButtonDisabled?: boolean,
    leftElement?: NavBarElement,
    rightElement?: NavBarElement,
    title?: string,
    titleIcon?: any,
    titleAction?: ()=>void,
  };

  static defaultProps = {
    backButtonDisabled: false,
    leftElement: null,
    rightElement: null,
    title: 'FCBayern Tickets',
    titleIcon: null,
    titleAction: null,
  };

  constructor() {
    super();
  }

  _renderLeftElement() {
    let element = this.props.leftElement;
    if (element && (element.element || element.icon || element.label)) {
      if (element.element) {
        return element.element;
      } else if (element.icon) {
        // let icon = utils.getIconElement(
        //   {family: element.icon.family, name: element.icon.name},
        //   {style: styles.transparentIcon, size: 30, color: element.icon.color || colors.white });
        return (<TouchableOpacity onPress={() => {element.action && element.action();}}
                                  disabled={!element.action}
                                  style={styles.simpleContainer} >
          <View style={styles.leftIcon}>
            {/*{icon}*/}
          </View>

        </TouchableOpacity>);
      } else if (element.label) {
        return (<View style={styles.simpleContainer}>
          <Text style={[styles.label, {textAlign: 'right'}]}/>
        </View>);
      }
    } else if (!this.props.backButtonDisabled) {
      const family = Platform.select({ios: 'Ionicons', android: 'MaterialIcons'});
      const name = Platform.select({ios: 'ios-arrow-back', android: 'arrow-back'});
      // const backButton = utils.getIconElement({family: family, name: name},
      //   {style: styles.transparentIcon, size: 30, color: colors.white });
      return (<TouchableOpacity onPress={() => {this.props.navigation.goBack();}}
                                style={styles.simpleContainer} >
        <View style={styles.backIcon}>
          {/*{backButton}*/}
        </View>
      </TouchableOpacity>);
    }
    return null;
  }

  _renderRightElement() {
    let element = this.props.rightElement;
    if (element && (element.element || element.icon || element.label)) {
      if (element.element) {
        return element.element;
      } else if (element.icon) {
        // let icon = utils.getIconElement(
        //   {family: element.icon.family, name: element.icon.name},
        //   {style: styles.transparentIcon, size: 30, color: element.icon.color || colors.white });
        return (<TouchableOpacity onPress={() => {element.action && element.action();}}
                                  disabled={!element.action}
                                  style={styles.simpleContainer} >
          <View style={styles.rightIcon}>
            {/*{icon}*/}
          </View>
        </TouchableOpacity>);
      } else if (element.label) {
        return (<View style={styles.simpleContainer}>
          <Text style={[styles.label, {textAlign: 'right'}]}/>
        </View>);
      }
    }
    return null;
  }

  _renderTitle() {
    return (<TouchableOpacity onPress={() => {this.props.titleAction && this.props.titleAction();}}
                              style={styles.titleContainer}
                              disabled={!this.props.titleAction}>
      <View style={styles.titleView}>
        {/*{this.props.titleIcon && <Image style={styles.titleIcon} source={this.props.titleIcon} resizeMode="cover" />}*/}
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    </TouchableOpacity>);
  }

  render() {
    return (
      <View style={styles.navBarContainer}>
        <View style={styles.barContainer}>
          {Platform.OS === 'ios' && <View style={styles.statusBar} />}
          <View style={styles.navBar}>
            <View style={styles.left}>
              {this._renderLeftElement()}
            </View>
            <View style={styles.center}>
              {this._renderTitle()}
            </View>
            <View style={styles.right}>
              {this._renderRightElement()}
            </View>
          </View>
        </View>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBarContainer: {
    height: Platform.select({
      ios: 64,
      android: 54,
    }),
    backgroundColor: colors.primaryColor,
    width: '100%',
  },
  barContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  statusBar: {
    height: 20,
    width: '100%',
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  center: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 20 * Dimensions.get('window').width / 375,
    textAlign: 'center',
  },
  titleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  label: {
    color: colors.white,
    fontSize: 18,
  },
  leftIcon: {
    paddingLeft: 15,
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'center',
  },
  backIcon: {
    paddingLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
  },
  rightIcon: {
    paddingRight: 15,
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
  },
  simpleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  transparentIcon: {
    backgroundColor: 'transparent',
  }
});
