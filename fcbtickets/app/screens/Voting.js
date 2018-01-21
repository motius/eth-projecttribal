import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {texts} from '../config/text';
import {commonStyles} from '../config/styles';
import {images} from '../assets';

export class Voting extends React.Component {
  static navigationOptions = {
    tabBarLabel: texts.home.buyTicketsTabTitle,
    // tabBarIcon: ({tintColor}) => (
    //   <Image source={images.voting} style={commonStyles.tabIcon} />
    // )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to FC Bayern Ticketing!
        </Text>
        <Text style={styles.instructions}>
          You can buy tickets here
        </Text>
        <Text style={styles.instructions}>
          Buy them all!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});