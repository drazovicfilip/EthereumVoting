import { runInAction, action, computed, observable } from 'mobx';
import * as mobx from 'mobx';

import VotingContract from '../../build/contracts/Voting.json'
import getWeb3 from '../utils/getWeb3'

class DomainStore {
  @observable polls = [
    // {
    //   id: 1,
    //   name: 'Accenture Poll',
    //   description: 'Laborum culpa ea deserunt elit cillum occaecat sit in excepteur sunt veniam. Cupidatat do sunt ea enim. Ullamco in qui cillum dolor excepteur deserunt voluptate minim aute enim ea sunt. Ex fugiat ipsum labore incididunt Lorem tempor aute voluptate.',
    //   // votes: 69,
    //   created: Date.now(),
    //   expires: Date.now() + 4999,
    //   results: [
    //     {
    //       name: 'David',
    //       votes: 50,
    //       address:'0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    //     },
    //     {
    //       name: 'Roger',
    //       votes: 25,
    //       address:'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    //     }
    //   ]
    // },
    // {
    //   id: 2,
    //   name: 'PollName2',
    //   description: '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    //   // votes: 69,
    //   created: Date.now(),
    //   expires: Date.now() + 9994,
    //   results: [
    //     {
    //       name: 'asdasd',
    //       votes: 4,
    //       address:'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    //     },
    //     {
    //       name: 'Bar',
    //       votes: 5,

    //       address:'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    //     }
    //   ]
    // },
    // {
    //   id: 3,
    //   name: 'PollName',
    //   description: 'This is a great poll',
    //   // votes: 69,
    //   created: Date.now(),
    //   expires: Date.now() + 9994,
    //   results: [
    //     {
    //       name: 'fggffg',
    //       votes: 4,
    //       address:'0xf17f52151EbEF6C7334FAD080c5704D77216b732',

    //     },
    //     {
    //       name: 'Bar',
    //       votes: 5,
    //       address:'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    //     }
    //   ]
    // },
    // {
    //   id: 4,
    //   name: 'other pollname',
    //   description: 'This is a great poll',
    //   // votes: 69,
    //   created: Date.now(),
    //   expires: Date.now() + 9994,
    //   results: [
    //     {
    //       name: 'John',
    //       votes: 4,

    //       address:'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    //     },
    //     {
    //       name: 'Bar',
    //       votes: 5,

    //       address:'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    //     }
    //   ]
    // },
  ]

  @computed get pollsVotes() {
    return this.polls.map((n) => {
      return n.results.reduce((a, c) => {
        return a + c.votes;
      }, 0);
    });
  }

  web3 = undefined;
  VotingInstance = undefined;
  accounts = undefined;
  constructor() {
    this.createVotingInstance()
    .then(() =>
      setInterval(this.increment, 2000)
    ).catch((e) => {
      console.log('Could not create voting instance', e);
    })
  }

  createVotingInstance() {
    const contract = require('truffle-contract')
    const Voting = contract(VotingContract)
    return (
      getWeb3.then(results => {
        this.web3 = results.web3;
        Voting.setProvider(this.web3.currentProvider);
        return Voting.deployed();
      })
      .then((instance) => {
        this.VotingInstance = instance
        this.web3.eth.getAccounts((error, accounts) => this.accounts = accounts);
      })
    );
  }

  /**
   * @param name {string}
   * @param descript {string}
   * @param duration {number}
   * @param candidates array of {name, address}
   */
  createPoll(name, descript, duration, candidates) {
    const addresses = candidates.map((c) => c.address);
    const names = candidates.map((c) => c.name);
    console.log('name', name);
    console.log('descript', descript);
    console.log('duration', duration);
    console.log('candidates', candidates);
    // this.VotingInstance.createPoll(name, descript, duration, addresses, {gas: 999999, from: this.accounts[0]});
    this.VotingInstance.createPoll(name, descript, duration, addresses, names, {gas: 999999, from: this.accounts[0]});
    // "pollName","pollDescript",10,["0xca35b7d915458ef540ade6068dfe2f44e8fa733c", "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"]
  }

  getPolls() {
    // Get accounts.
    this.VotingInstance.getPollsLength()
    .then((result) => {
      const pollsLength = result.c[0];
      let nextPolls = observable(new Array(pollsLength));
      let updatesCompleted = 0;
      for (let i = 0; i < pollsLength; ++i) {
        this.VotingInstance.getPoll(i)
        .then((result) => {
          nextPolls[i] = {
            id: result[0].c[0],
            name: result[1],
            description: result[2],
            created: result[3].c[0],
            expires: result[4].c[0],
          }
          nextPolls[i].results = result[5].map((c, i) => {
            return {
              // name: 'dano',
              name: this.web3.toAscii(result[7][i]),
              votes: result[6][i].c[0],
              address: c
            };
          })
          if (++updatesCompleted === pollsLength) {
            runInAction(() => this.polls = nextPolls);
          }
          // console.log('index', result);
          // console.log('nextPolls', updatesCompleted, mobx.toJS(nextPolls));
        })
      }
    })
  }

  voteInPoll(id, address) {
    this.VotingInstance.vote(id, address, {gas: 999999, from: this.accounts[0]});
  }

  @action.bound
  increment() {
    this.getPolls();
    // this.createPoll('qwer', 'asdf', 10, [{name: 'dano', address: '0xca35b7d915458ef540ade6068dfe2f44e8fa733c'}])
  }
}

export default DomainStore;
