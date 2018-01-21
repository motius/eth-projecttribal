pragma solidity ^0.4.18;

import './FanClub.sol';

contract BallotBox {

    struct Vote {
        string proposalId;      // id of the proposal that the vote was cast on
        address userId;         // id of the user who cast the vote
        uint choice;            // index of the choice that the user voted on
    }

    struct Proposal {
        string uid;             // unique id of a proposal
        string name;            // short name
        uint voteCount;         // number of accumulated votes
        string description;     // description of the proposal
        address creator;        // account of the person who created the proposal
        string createdOn;       // date of creation
    }

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => mapping(address => string)) public votes;
    mapping(string => Proposal) proposals;

    address public fanClub;

    /// Create a new ballot to choose one of `proposalNames`.
    function BallotBox(address _club) public {
        require(_club != address(0));
        fanClub = _club;
    }

    function getClub() public view returns (address) {
        return fanClub;
    }

    function test(address _addr) public returns (address user_id, string first_name, string last_name, string role) {
        FanClub fc = FanClub(fanClub);
        return fc.getUser(_addr);
    }

//    function submitProposal(string name, string description) public payable returns (string) {
//        for (uint i = 0; i < proposalNames.length; i++) {
//            // `Proposal({...})` creates a temporary
//            // Proposal object and `proposals.push(...)`
//            // appends it to the end of `proposals`.
//            proposals.push(Proposal({
//                name: proposalNames[i],
//                voteCount: 0
//                }));
//        }
//    }

//    /// Delegate your vote to the voter `to`.
//    function delegate(address to) public {
//        // assigns reference
//        Voter storage sender = voters[msg.sender];
//        require(!sender.voted);
//
//        // Self-delegation is not allowed.
//        require(to != msg.sender);
//
//        // Forward the delegation as long as
//        // `to` also delegated.
//        // In general, such loops are very dangerous,
//        // because if they run too long, they might
//        // need more gas than is available in a block.
//        // In this case, the delegation will not be executed,
//        // but in other situations, such loops might
//        // cause a contract to get "stuck" completely.
//        while (voters[to].delegate != address(0)) {
//            to = voters[to].delegate;
//
//            // We found a loop in the delegation, not allowed.
//            require(to != msg.sender);
//        }
//
//        // Since `sender` is a reference, this
//        // modifies `voters[msg.sender].voted`
//        sender.voted = true;
//        sender.delegate = to;
//        Voter storage delegate = voters[to];
//        if (delegate.voted) {
//            // If the delegate already voted,
//            // directly add to the number of votes
//            proposals[delegate.vote].voteCount += sender.weight;
//        } else {
//            // If the delegate did not vote yet,
//            // add to her weight.
//            delegate.weight += sender.weight;
//        }
//    }
//
//    /// Give your vote (including votes delegated to you)
//    /// to proposal `proposals[proposal].name`.
//    function vote(uint proposal) public {
//        Voter storage sender = voters[msg.sender];
//        require(!sender.voted);
//        sender.voted = true;
//        sender.vote = proposal;
//
//        // If `proposal` is out of the range of the array,
//        // this will throw automatically and revert all
//        // changes.
//        proposals[proposal].voteCount += sender.weight;
//    }
//
//    /// @dev Computes the winning proposal taking all
//    /// previous votes into account.
//    function winningProposal() public view
//    returns (uint winningProposal)
//    {
//        uint winningVoteCount = 0;
//        for (uint p = 0; p < proposals.length; p++) {
//            if (proposals[p].voteCount > winningVoteCount) {
//                winningVoteCount = proposals[p].voteCount;
//                winningProposal = p;
//            }
//        }
//    }
//
//    // Calls winningProposal() function to get the index
//    // of the winner contained in the proposals array and then
//    // returns the name of the winner
//    function winnerName() public view
//    returns (bytes32 winnerName)
//    {
//        winnerName = proposals[winningProposal()].name;
//    }
}