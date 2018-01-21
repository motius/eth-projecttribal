import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {texts} from '../config/text';
import {colors} from "../config/colors";
import {commonStyles} from '../config/styles';
import {images} from '../assets';
import Icon from 'react-native-vector-icons/Ionicons'
import {SimpleVoteCard, ImageVoteCard} from "../components";
import {voteForProposal} from '../actions/votes';
import { connect } from 'react-redux';

export class VotingComponent extends React.Component {
  static navigationOptions = {
    tabBarLabel: texts.voting.title,
    tabBarIcon: ({tintColor}) => (
      <Icon name="md-checkbox-outline" size={24} color={tintColor} />
    )
  };

  props: {
    proposals: Array<any>;
  };

  static defaultProps = {
    proposals: []
  };

  constructor() {
    super();
    this._renderItem = this._renderItem.bind(this);
    this._onVote = this._onVote.bind(this);
  }

  _onVote(item, selectedOption) {
    this.props.dispatch(voteForProposal(item, selectedOption));
  }

  _renderItem(item) {
    const vote = this.props.votes.find(el => el.proposalId === item.item.uid);
    const disabled = vote !== null || (this.props.votesInProgress.indexOf(item.item.uid) >= 0);
    // debugger;
    switch (item.item.mode) {
      case 'simple':

        // debugger;
        return (<SimpleVoteCard
          {...item}
          disabled={disabled}
          vote={vote}
          action={this._onVote}
        />);
      case 'image':
        // debugger;
        return (<ImageVoteCard
          {...item}
          disabled={disabled}
          vote={vote}
          action={this._onVote}
        />);
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{paddingVertical: 5}}
          data={this.props.proposals}
          renderItem={this._renderItem} />
      </View>
    );
  }
}

export const Voting = connect(
  state => ({
    ...state.votes,
  })
)(VotingComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});