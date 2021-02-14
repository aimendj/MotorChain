var express = require('express');
var router = express.Router();
let Web3 = require("web3");
let net = require("net");


const provider = new Web3.providers.IpcProvider(
          "/Users/mohamedaimendjari/Library/Ethereum/geth.ipc", net
        );
const web3 = new Web3(provider);

const blockNumber = web3.eth.getAccounts().then(accounts => {
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
  	value: accounts
  });
});
});



module.exports = router;
