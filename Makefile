initialize:
	geth init motorchaintestnet.json

run:
	geth --config config.toml --miner.gastarget 0 --miner.gasprice 0

mine:
	geth --mine --config config.toml --unlock 0x1949789fF7b51175A3adaf7cdCAa20A51b85b3b6 --password password.txt --miner.gasprice 0 --miner.gastarget 0

clean:
	yes | geth removedb

install:
	./go/src/make.bash
	make all -C ./go-ethereum/