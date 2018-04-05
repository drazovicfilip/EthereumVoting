pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;

contract Voting {
  struct Poll {
    uint id;
    string name;
    string descript;
    uint created;
    uint expires;
    address[] candidateAddresses;
    uint[] candidateVotes;
    bytes32[] candidateNames;
  }

  Poll[] polls;
  uint nextPollId;

  function Voting() public {
    nextPollId = 0;
  }
  
  // "pollName","pollDescript",10,["0xca35b7d915458ef540ade6068dfe2f44e8fa733c", "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"], ["dano", "sam"]
  function createPoll(string nameOfPoll, string descript, uint durationMinutes, address[] candidateAddr, bytes32[] candidateNames) public {
    Poll memory polly;
    uint[] memory candVotes = new uint[](candidateAddr.length);
    polly.id = nextPollId++;
    polly.name = nameOfPoll;
    polly.descript = descript;
    polly.created = now;
    polly.expires = polly.created + (durationMinutes * 1 minutes); 
    polly.candidateAddresses = candidateAddr;
    polly.candidateVotes = candVotes;
    polly.candidateNames = candidateNames;
    
    polls.push(polly);
  }

  function getPollsLength() public view returns(uint) {
    return polls.length;
  }
  
  function getPoll(uint pollId) public view returns(uint id, string name, string descript, uint created, uint expires, address[] candidateAddresses, uint[] candidateVotes, bytes32[] candidateNames) {
    require(pollId < polls.length);
    
    id = polls[pollId].id;
    name = polls[pollId].name;
    descript = polls[pollId].descript;
    created = polls[pollId].created;
    expires = polls[pollId].expires;
    candidateAddresses = polls[pollId].candidateAddresses;
    candidateVotes = polls[pollId].candidateVotes;
    candidateNames = polls[pollId].candidateNames;
  }
  
  function getId(string pollname) public view returns(uint) {
    //iterate through polls list (polls[X].name)
    //get the last match with the same poll name 
    //return 

    //get the index of the candidate address 
    for (uint i = 0; i < polls.length; i++) {
      if (keccak256(polls[polls.length-i-1].name) == keccak256(pollname)) {
        return polls[polls.length-i-1].id;
      }
        
    }
  }
  
  //0 ,"0xca35b7d915458ef540ade6068dfe2f44e8fa733c"
  //0, "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
  function vote(uint id, address candidateAddress) public {
    require(id < polls.length);
    
    //get the index of the candidate address 
    for (uint i = 0; i < polls[id].candidateAddresses.length; i++) {
        if (polls[id].candidateAddresses[i] == candidateAddress) {
            polls[id].candidateVotes[i] += 1;
            return;
        }
    }
    // Otherwise candidate address not valid
    revert();
  }
}
