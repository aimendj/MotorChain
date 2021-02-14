var express = require('express');
var router = express.Router();
let Web3 = require("web3");
let net = require("net");
let SimpleVINContract = require("../build/contracts/SimpleVIN.json");
const arrayBufferToHex = require('array-buffer-to-hex')

const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(SimpleVINContract.abi);


const provider = new Web3.providers.IpcProvider(
          "/Users/mohamedaimendjari/Library/Ethereum/geth.ipc", net
        );
/*

const provider = new Web3.providers.HttpProvider(
          "http://localhost:8556"
        );
        */
const web3 = new Web3(provider);



/* GET users listing. */
router.get('/blockNumber', async function(req, res, next) {

const blockNumber = await web3.eth.getBlockNumber();
  res.json({
  	value: blockNumber
  });


});


router.get('/accounts', async function(req, res, next) {
const accounts = await web3.eth.getAccounts();
  res.json({
  	value: accounts
  });

});

router.get('/networkId', async function(req, res, next) {
const networkId = await web3.eth.net.getId();
  res.json({
  	value: networkId
  });

});


router.get('/getContract', async function(req, res, next) {

	const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleVINContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleVINContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
	
	
		res.send(instance);
		
	
});

router.post('/unlockAccount', async function(req, res, next) {
		const unlockAccount = await web3.eth.personal.unlockAccount(req.body.user, req.body.pw);

		res.json({
  			value: unlockAccount
  		});
});

router.post('/createReport', async function(req, res, next) {
	const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleVINContract.networks[networkId];
      const contract = new web3.eth.Contract(
        SimpleVINContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      let report = {vin: '',
      brand: '', 
      model: '', 
      immatDate: ''};
      const response1 = await getLastEventOfVIN(req.body.input.vin);
      console.log(response1);
      let hash = response1.hash;
      if(response1.hash === ''){
		const response = await contract.methods.createReport(req.body.input.vin, req.body.input.brand, req.body.input.model, req.body.input.immatDate).send({ from: req.body.accounts.value[0] })
      	console.log(response);
      	hash = response.transactionHash;
      } 
      console.log(hash);
      const response = await contract.methods.addEvent(req.body.input.vin, req.body.input.brand, req.body.input.model, req.body.input.immatDate, 
      		hash, req.body.input.date, req.body.input.mileage, req.body.input.type, req.body.input.description).send({ from: req.body.accounts.value[0] })
      		report.brand = "Done";
      
	 
		res.json({
  			report: report
  		});
});



getReport = async (vin) => {

    const blockNumber = await web3.eth.getBlockNumber();
    let i;
    let response = {vin: '', brand: '', model: '', immatDate: ''};

   
      for (i = blockNumber; i >= 0; i--) 
      { 
      const txCount = await web3.eth.getBlockTransactionCount(i);
      
      if(txCount > 0)
      {
         let j;
         for (j = 0; j < txCount; j++) 
         { 
            let tx = await web3.eth.getTransactionFromBlock(i, j);
            
            const result = decoder.decodeData(tx.input);
            
            if(result.method === SimpleVINContract.abi[1].name && result.inputs[0] === vin){
              response.vin = result.inputs[0];
              response.brand = result.inputs[1];
              response.model = result.inputs[2];
              response.immatDate = result.inputs[3];

              return response;
            }
          }
      }
      }
    response.brand = "VIN does not exist";

    return response;

}

getLastEventOfVIN = async (vin) => {

    const blockNumber = await web3.eth.getBlockNumber();
    let i;
    let response = {blockNumber: '', txIndex:'', hash:''};

    
      for (i = blockNumber; i >= 0; i--) 
      { 
      const txCount = await web3.eth.getBlockTransactionCount(i);
      
      if(txCount > 0)
      {
         let j;
         for (j = 0; j < txCount; j++) 
         { 
            let tx = await web3.eth.getTransactionFromBlock(i, j);
            
            const result = decoder.decodeData(tx.input);
            
            if((result.method === SimpleVINContract.abi[2].name || result.method === SimpleVINContract.abi[1].name) && result.inputs[0] === vin){
              response.hash = tx.hash;

              return response;
            }
          }
      }
      }
    

    return response;

}
router.get('/findVIN/:p1', async function(req, res, next) {
	
	let report = {vin: '', brand: '', model: '', immatDate: ''};
	
	let events = [];
	let numberOfEvents = 0;
    report.vin = req.params.p1;
    report.brand = "Please Wait";

    let input = {vin: req.params.p1};
    const response = await getLastEventOfVIN(req.params.p1);
    console.log(response);
    let nextHash = response.hash;
    if(nextHash === ''){
    	input.vin = '';
    	report.brand = "VIN does not exist";
    } else {
    
	while(nextHash !== "0x0000000000000000000000000000000000000000000000000000000000000000")
    {	const tx = await web3.eth.getTransaction(nextHash);
		const result = decoder.decodeData(tx.input);
		if(result.method === SimpleVINContract.abi[1].name){
	 	report.vin = result.inputs[0];
        report.brand = result.inputs[1];
    	report.model = result.inputs[2];
    	report.immatDate = result.inputs[3];
    	console.log("found initial report");
    	nextHash = '0x0000000000000000000000000000000000000000000000000000000000000000';
    	} else{
    	report.vin = result.inputs[0];
        report.brand = result.inputs[1];
    	report.model = result.inputs[2];
    	report.immatDate = result.inputs[3];

    	events.push({ id: numberOfEvents, date: result.inputs[5], mileage: result.inputs[6], type: result.inputs[7], description: result.inputs[8] });
    	numberOfEvents ++;
    	try{
    		nextHash = "0x"+arrayBufferToHex(result.inputs[4]);
    	} catch {
    		nextHash = result.inputs[4];
    	}
    	
    	console.log("found event 1");
    	console.log(nextHash);
		}


    }

    	
    

	
    }

    res.json({
  			input: input,
  			report: report,
  			events: events
  		});
});
     

module.exports = router;
