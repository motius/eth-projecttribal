pragma solidity ^0.4.18;

import "./FanClub.sol";

contract BallotBox {

    event RESTishResult(uint status_code, bytes32 msg);

    struct Vote {
        bytes32 proposalId;     // id of the proposal that the vote was cast on
        address userId;         // id of the user who cast the vote
        uint choice;            // index of the choice that the user voted on
    }

    struct Proposal {
        bytes32 uid;             // unique id of a proposal
        bytes32 name;            // short name
        uint voteCount;          // number of accumulated votes
        bytes32 description;     // description of the proposal
        address creator;         // account of the person who created the proposal
        uint createdOn;          // date of creation
    }

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => mapping(address => bytes32)) public votes;
    mapping(bytes32 => Proposal) proposals;
    bytes32[] public proposalNames;
    uint proposalNum;

    address fanClub;

    function BallotBox() public {
//        require(fc != address(0));
//        fanClub = fc;
        proposalNum = 0;
    }

    function getClub() public view returns (address) {
        return fanClub;
    }

    function setClub(address fc) public payable {
        require(fc != address(0));
        fanClub = fc;
    }

    function testDBConnection(address _addr) public view returns (bytes32, bytes32) {
        FanClub fc = FanClub(fanClub);
        var (, first_name, last_name, ) = fc.getUser(_addr);
        return (first_name, last_name);
    }

    function getProposalByID(bytes32 uid) public view returns (bytes32, bytes32, uint) {
        return (proposals[uid].uid, proposals[uid].name, proposals[uid].createdOn);
    }

    function getProposalByName(bytes32 name) public view returns (bytes32, bytes32, uint, bytes32, bytes32, address) {
        var uid = keccak256(name);
        return (
            proposals[uid].uid,
            proposals[uid].name,
            proposals[uid].createdOn,
            uintToBytes32(proposals[uid].voteCount),
            proposals[uid].description,
            proposals[uid].creator
        );
    }

    function submitProposal(bytes32 name) public payable returns (bytes32) {
        var uid = keccak256(name);
        var (user_id, , ) = FanClub(fanClub).getUser(msg.sender);
        if (user_id == address(0)) {
            RESTishResult(403, "Unknown user");
        } else if (proposals[uid].createdOn != 0) {
            RESTishResult(400, "Proposal already exists");
        } else if (name == "") {
            RESTishResult(400, "Name should not be empty");
        } else {
            proposals[uid] = Proposal({
                uid: uid,
                name: name,
                voteCount: 0,
                description: "",
                creator: msg.sender,
                createdOn: now
            });
            RESTishResult(201, uid);
            proposalNames.push(name);
            proposalNum += 1;
        }
    }

    function listProposals() public view returns (bytes32[]) {
        return proposalNames;
    }

    function getNumOfProposals() public view returns (uint) {
        return proposalNum;
    }

    function vote(bytes32 name) public payable {
        var uid = keccak256(name);
        var (user_id, , ) = FanClub(fanClub).getUser(msg.sender);
        if (user_id == address(0)) {
            RESTishResult(403, "Unknown user");
        } else if (proposals[uid].creator == address(0)) {
            RESTishResult(404, "Unknown proposal");
        } else {
            proposals[uid].voteCount = proposals[uid].voteCount + 1;
            RESTishResult(200, "Voted added to proposal");
        }
    }

    function uintToBytes32(uint i) private pure returns (bytes32) {
        return bytes32(i);
    }

    function bytes32ToString(bytes32 x) private pure returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

}