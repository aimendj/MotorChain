var Migrations = artifacts.require("./Migrations.sol");

const Web3 = require('web3');

const TruffleConfig = require('../truffle-config');

module.exports = function(deployer, network, addresses) {
  const config = TruffleConfig.networks[network];
  console.log(config);
  if (process.env.ACCOUNT_PASSWORD) {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));
  
    console.log('>> Unlocking account ' + config.from);
    web3.eth.personal.unlockAccount(config.from, process.env.ACCOUNT_PASSWORD);
  }

  console.log('>> Deploying migration');
  deployer.deploy(Migrations);
};
