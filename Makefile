initialize:
	geth init motorchaintestnet.json

run:
	geth --networkid 977 --rpc --rpccorsdomain "*"  --etherbase 1949789fF7b51175A3adaf7cdCAa20A51b85b3b6 --bootnodes enode://c10e4577de3f4d91017b0da1a3773c84feb826901998c8c52cee725ceb9c1b4c298877e553f17e08d6ccda3bfefff6e3620a5f9ae026f5f3b3658ba3649699f2@127.0.0.1:30306 --syncmode 'fast'

clean:
	yes | geth removedb