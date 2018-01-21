import {type} from '../reducers/votes';


export function voteForProposal(proposal) : void {
  return async function (dispatch: (action : Action) => any, getState: () => Object){
    dispatch({type: type.setVoteInProgress, value: proposal.uid});
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(500);
        // resolve();
      });
      dispatch({type: type.addVote, value: proposal.uid});
    }catch(err) {
      console.log(err);
    }
  };
}