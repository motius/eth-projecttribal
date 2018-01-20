import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavBar} from '../components/NavBar';

export class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (<NavBar
        navigation={navigation}
        title='Crypto Tickets'
        // leftElement={
        //   {icon:
        //     {family: Platform.select({ios: 'Ionicons', android: 'MaterialIcons'}),
        //       name: Platform.select({ios: 'ios-menu', android: 'menu'})},
        //     action: () => {
        //       navigation.openDrawer && navigation.openDrawer();
        //     }
        //   }
        // }
      />
    )
  });

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          Hello cryptoballs!
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