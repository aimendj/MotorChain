const path = require("path");


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    motorchaintestnet: {
      host: "127.0.0.1",
      port: 8556,
      network_id: "977", // Match any network id
      from: "0x82C888F68f2131D828c57D973CE061D3877502e0"
    }
  }
};

