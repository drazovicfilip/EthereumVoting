# Feb-2018 Bootcamp Group 6

## Installing and running

### Installation

- Install Git
- Install [npm](https://www.npmjs.com/get-npm) (or use homebrew/your package manager if you're on on Windows)
- `npm install -g truffle`
- Clone this repo `git clone https://github.com/dualscyther/bootcamp-feb-2018-group6.git`
- Go to the repo `cd bootcamp-feb-2018-group6`
- `npm install`
- [Install metamask](https://metamask.io/)
- [Install Ganache](http://truffleframework.com/ganache/)
- todo

### Running

Windows users, if you are having issues then read [this](http://truffleframework.com/docs/advanced/configuration#resolving-naming-conflicts-on-windows) aka use Git BASH.

#### Basic

- If you have already installed metamask then disable it in your browser for now
- From inside the repo folder:
- `truffle develop`
- From within the truffle console:
- `compile`
- `migrate`
- In a different tab (while the truffle console is still running - since while we are running the truffle console it is also functioning as our local blockchain):
- `npm run start`

#### With Ganache

- Open Ganache
- Make sure Ganache says that the RPC server is at HTTP://127.0.0.1:9545
- From inside the repo folder but not inside the truffle console:
- `truffle compile`
- `truffle migrate`
- `npm run start`

#### With Ganache and MetaMask

- Open Ganache etc...
- Click your MetaMask browser extension icon and click import
- Copy + paste the seed words that Ganache shows at the top
- If you have already compiled, migrated, and are running the web app using `npm run start` then simply refresh the page. Else:
  - `truffle compile`
  - `truffle migrate`
  - `npm run start`
- When the page loads, MetaMask should display a pop up telling you to authorize the transaction (you might need to change your gas price to be non-zero if it isn't already done for you). Accept the prompt and it should work!

### What you need to run the full stack app

- The front end JavaScript web app
- A way of communicating with a node on the network using web3.js. In our project we will use the MetaMask browser extension to provide the front end app with the web3 API, and we will point it at our local/development/private Ethereum network node.
- An Ethereum network + a node on the network to communicate with from the front end. When developing we will use Ganache to run a local Ethereum network (consisting of 1 node). Later on we will create a network of nodes between the different teams, and probably use Geth as our Ethereum node implementation.
- Smart contract code deployed to the Ethereum network.

## web3.js API

To communicate with an Ethereum node or transact with a smart contract deployed on the blockchain from inside a JavaScript or web application you can use the web3.js library. Under the hood the web3.js library communicates with an Ethereum node through JSON RPC calls. The Ethereum node must expose its a RPC layer. The MetaMask extension exposes the web3 API by an injected web3 object which you can access via JavaScript. The MetaMask extension does not support most synchronous web3 API methods. Make your method calls asynchronous!

[MetaMask docs](https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md)

## Working with Truffle

Truffle is a framework which makes deploying our smart contract and web app easier. It lets us focus on writing code, rather than configuring stuff so that it will actually run.

- You won't need to do anything like `truffle init` - this repo is already initialized.
- [Truffle docs](http://truffleframework.com/docs/)
- [Using the Truffle react preconfigured box](http://truffleframework.com/boxes/react) (don't worry about this for this repository as it is already done)

## Creating and connecting to a private network

- [Truffle recommendations](http://truffleframework.com/docs/getting_started/client)
- [Ganache](http://truffleframework.com/ganache/) lets you run a local blockchain on your computer. It provides a nice GUI for you to configure your server and view the transactions and balances of different addresses in real time.
- [Choosing Ethereum nodes/clients and running them](https://www.ethereum.org/cli)

## Full tutorial on how to make a full stack decentralized app

<https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2>
