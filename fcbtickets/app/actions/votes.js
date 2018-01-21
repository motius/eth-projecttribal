import {type} from '../reducers/votes';


export function voteForProposal(proposal, selectedOption) : void {
  return async function (dispatch: (action : Action) => any, getState: () => Object){
    dispatch({type: type.setVoteInProgress, value: {inProgress: true, proposalId: proposal.uid}});
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {console.log("lol"); resolve()}, 1000);
      });
      dispatch({type: type.addVote, value: {vote: selectedOption, proposalId: proposal.uid}});
    }catch(err) {
      console.log(err);
    }finally {
      dispatch({type: type.setVoteInProgress, value: {inProgress: false, proposalId: proposal.uid}});
    }
  };
}