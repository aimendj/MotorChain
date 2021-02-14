# MotorChain
Private Ethereum Blockchain using Proof of Authority

* Install latest distribution of [Go](https://golang.org/doc/install) if you don't have it already.

How to Install:

* Run `git clone --recursive https://github.com/aimendj/MotorChain.git`

* Go to MotorChain directory

* Run `make install` to install MotorChain dependencies

Use: 

* `make initialize` to initialize the blockchain
  
* `make run` to run a simple node

* `make mine` to run a miner (sealer when it comes to Proof-of-Authority)
  
* `make clean` to clean the blockchain


  ACCOUNT_PASSWORD=password truffle deploy --network motorchaintestnet --reset
