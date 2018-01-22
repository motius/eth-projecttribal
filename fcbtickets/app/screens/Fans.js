import React from 'react';
import {View, Image, ImageBackground, Text, StyleSheet, ScrollView} from 'react-native';
import QRCode from 'react-native-qrcode';
import Icon from 'react-native-vector-icons/Ionicons'
import {texts} from '../config/text';
import {colors} from "../config/colors";
import {commonStyles} from "../config/styles";
import {images} from "../assets/index";
import { connect } from 'react-redux';
import {getUserObject} from '../actions/FanClubContract';

export class FansComponent extends React.Component {
  static navigationOptions = {
    tabBarLabel: texts.fans.title,
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-people" size={24} color={tintColor} />
    )
  };

  constructor() {
    super();
    this._renderUserOverlay = this._renderUserOverlay.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getUserObject("0x563983c8a37308d9028e904c22bb7de3794492c2"));
  }

  _renderUserOverlay() {
    return (<View style={styles.overlay}>
      <View style={styles.userView}>
        <View style={styles.userPicture}>
          <QRCode
            value='TestValueTrololol'
            size={100}
            bgColor={colors.white}
            fgColor={colors.black}/>
        </View>
        <View style={styles.userDataView}>
          <Text style={styles.bigText}>MyID</Text>
          <Text style={styles.mediumText}>Status: VIP</Text>
        </View>
      </View>
      <View style={styles.statsView}>
        <View style={styles.statsBox}>
          <Text style={styles.bigText}>9001</Text>
          <Text style={styles.mediumText}>FANS</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.bigText}>1366</Text>
          <Text style={styles.mediumText}>POINTS</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.bigText}>42</Text>
          <Text style={styles.mediumText}>RANK</Text>
        </View>
      </View>
    </View>);
  }

  render() {
    const user = this.props.user;

    return <View style={styles.container}>
      <ScrollView style={commonStyles.simpleContainer}>
        <ImageBackground source={images.arena_inside} style={styles.banner}>
          {this._renderUserOverlay()}
          {user && this._renderUserOverlay()}
        </ImageBackground>
      </ScrollView>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    height: 260,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.black,
    opacity: 0.7,
    padding: 5,
    flexDirection: 'column',
  },
  userView: {
    flex: 2,
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 8,
  },
  userPicture: {
    flex: 1,
  },
  userDataView: {
    flex: 2,
    flexDirection: 'column',
  },
  statsView: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 8,
  },
  statsBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigText: {
    fontSize: 20,
    color: colors.white,
  },
  mediumText: {
    fontSize: 14,
    color: colors.lighterGray,
  },
});

export const Fans = connect(
  state => ({
    ...state.fanclub,
  })
)(FansComponent);