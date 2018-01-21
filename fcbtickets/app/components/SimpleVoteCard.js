import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, Platform} from 'react-native';
import {colors} from "../config/colors";
import {texts} from '../config/text';
import {commonStyles} from '../config/styles';

function renderTopSection(banner) {
  return <View style={styles.topContainer}>
    <Image style={styles.banner} source={banner} />
  </View>
}

function renderCenterSection(title, text) {
  return <View style={styles.centerContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
}

function renderBottomSection(item, disabled, action) {
  const buttons = item.options.map((option, i) => <TouchableOpacity
      key={i}
      disabled={disabled}
      style={commonStyles.materialButton}
      onPress={() => {action && action(item, option.text)}}>
    <Text style={commonStyles.materialButtonText}>{option.key}</Text>
  </TouchableOpacity>);
  return (<View style={styles.bottomContainer}>
    {buttons}
  </View>);
}

export const SimpleVoteCard = (props) => {
  return <View style={[styles.container, (props.vote && styles.disabledContainer)]}>
    {renderTopSection(props.item.banner)}
    {renderCenterSection(props.item.title, props.item.text)}
    {renderBottomSection(props.item, props.disabled, props.action)}
  </View>
};

const styles = StyleSheet.create({
  container: {
    height: 210,
    marginHorizontal: 10,
    marginVertical: 4,
    elevation: 2,
    flexDirection: 'column',
    backgroundColor: colors.white,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.5
      }
    }),
  },
  disabledContainer: {
    backgroundColor: colors.background,
  },
  topContainer: {
    flex: 3,
  },
  centerContainer: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 14,
  },
  banner: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
});