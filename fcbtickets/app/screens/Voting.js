import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {texts} from '../config/text';
import {colors} from "../config/colors";
import {commonStyles} from '../config/styles';
import {images} from '../assets';
import {SimpleVoteCard, ImageVoteCard} from "../components";

export class Voting extends React.Component {
  static navigationOptions = {
    tabBarLabel: texts.voting.title,
    // tabBarIcon: ({tintColor}) => (
    //   <Image source={images.voting} style={commonStyles.tabIcon} />
    // )
  };

  props: {
    openVotes: Array<any>;
  };

  static defaultProps = {
    openVotes: [{
      key: 1,
      mode: 'simple',
      banner: images.bayernBanner,
      title: 'Test1',
      text: 'Would you like to use this app?',
      options: [{text: 'Yes'},{text: 'No'}]
    },{
      key: 2,
      mode: 'simple',
      banner: images.bayernTeam,
      title: 'Test2',
      text: 'Would you like to drink coffee?',
      options: [{text: 'Yes'},{text: 'No'}]
    }]
  };

  constructor() {
    super();
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem(item) {
    switch (item.item.mode) {
      case 'simple':
        return (<SimpleVoteCard
          {...item}
        />);
      case 'image':
        return (<ImageVoteCard
          {...item}
        />);
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{paddingTop: 5}}
          data={this.props.openVotes}
          renderItem={this._renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});