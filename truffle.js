const ganache = require("ganache-cli")

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
    },
    in_memory: {
      provider: ganache.provider(),
      network_id: "*",
    },
    rinkeby: {
      provider: "https://rinkeby.infura.io/",
      network_id: 4,
    },
  },
}
