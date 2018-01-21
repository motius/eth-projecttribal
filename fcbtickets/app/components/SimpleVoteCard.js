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
    <Text>{title}</Text>
    <Text>{text}</Text>
  </View>
}

function renderBottomSection(options) {
  const buttons = options.map((option, i) => <TouchableOpacity key={i} style={commonStyles.materialButton} onPress={() => {option.action && option.action()}}>
    <Text style={commonStyles.materialButtonText}>{option.text}</Text>
  </TouchableOpacity>);
  return (<View style={styles.bottomContainer}>
    {buttons}
  </View>);
}

export const SimpleVoteCard = (props) => {
  return <View style={styles.container}>
    {renderTopSection(props.item.banner)}
    {renderCenterSection(props.item.title, props.item.text)}
    {renderBottomSection(props.item.options)}
  </View>
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginHorizontal: 10,
    marginVertical: 4,
    elevation: 2,
    flexDirection: 'column',
    backgroundColor: colors.white,
    flex: 1,
  },
  topContainer: {
    flex: 3,
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  banner: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
});