import React from 'react';
import {View, Text, Image, StyleSheet, Platform} from 'react-native';
import {colors} from "../config/colors";
import {texts} from '../config/text';
import moment from 'moment';

function renderTopSection(matchday, date) {
  return <View style={styles.topContainer}>
    <Text>{texts.game.bundesliga} {texts.game.matchday(matchday)}</Text>
    <Text>{moment(date).format('dd MMM YYYY hh:mm')}</Text>
  </View>
}

function renderCenterSection(homeTeam, visitorTeam) {
  return <View style={styles.centerContainer}>
    <View style={styles.imageView}>
      <Image style={styles.teamLogo} source={homeTeam.logo} />
      <ConditionalCachedImage style={[{width: 40 * this.props.scale}, {height: 40 * this.props.scale}, {borderRadius: 20 * this.props.scale}]} source={utils.correctImageFormat(home_team_image)} />
      <TypptText numberOfLines={1} style={[styles.text, styles.teamText, {color: textColor}, {fontSize: 15 * this.props.scale}]}>{this.props.game.home_team.name}</TypptText>
    </View>
    <View style={styles.textView}>
      <TypptText numberOfLines={1} style={[styles.text, {fontSize: 25 * this.props.scale}, {color: vsColor}]}>
        {vsHidden ? ':' : vsText }</TypptText>
    </View>
    <View style={styles.imageView}>
      <ConditionalCachedImage style={[{width: 40 * this.props.scale}, {height: 40 * this.props.scale}, {borderRadius: 20 * this.props.scale}]} source={utils.correctImageFormat(visitor_team_image)} />
      <TypptText numberOfLines={1} style={[styles.text, styles.teamText, {color: textColor}, {fontSize: 15 * this.props.scale}]}>{this.props.game.visitor_team.name}</TypptText>
    </View>
  </View>
}

function renderBottomSection(totalTickets, availableTickets) {
  return <View style={styles.bottomContainer}>
    <Text>{texts.game.availableTickets}</Text>
  </View>
}

export const Game = (props) => {
  return <View style={styles.container}>
    {renderTopSection(props.matchday, props.date)}
    {renderCenterSection(props.homeTeam, props.visitorTeam)}
    {renderBottomSection(props.totalTickets, props.availableTickets)}
  </View>
};

const styles = StyleSheet.create({
  container: {
    height: Platform.select({ios: 156, android: 162}),
    marginHorizontal: 5,
    marginVertical: 3,
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});