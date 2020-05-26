createAccount:
	geth account new --password password.txt > account.txt
	sed -n -i -e '4p' account.txt
	sed -i -e 's/Public address of the key:   //' account.txt 

updateConfigEtherbase:
	sed -i -e 's/Etherbase = "0x.*"/Etherbase = "'`cat account.txt`'"/' config.toml 

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