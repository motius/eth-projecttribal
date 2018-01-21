import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, Platform} from 'react-native';
import {colors} from "../config/colors";
import {texts} from '../config/text';
import {commonStyles} from '../config/styles';

function renderTopSection(title, text) {
  return <View style={styles.topContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>;
}

function renderBottomSection(item, action) {
  const buttons = item.options.map((option, i) => <TouchableOpacity
      key={i}
      style={[commonStyles.materialButton, styles.imageContainer, (i+1 < item.options.length) ? {borderRightWidth: 1, borderRightColor: colors.lighterGray} : null]}
      onPress={() => {action && action(item, option.text)}}>
    <Image source={option.image} style={styles.image} />
    {option.text && <Text style={commonStyles.materialButtonText}>{option.text}</Text>}
  </TouchableOpacity>);
  return (<View style={styles.bottomContainer}>
    {buttons}
  </View>);
}

export const ImageVoteCard = (props) => {
  return <View style={styles.container}>
    {renderTopSection(props.item.title, props.item.text)}
    {renderBottomSection(props.item, props.action)}
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
  topContainer: {
    flex: 1,
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 14,
  },
  imageContainer: {
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});