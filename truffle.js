const HDWalletProvider = require("truffle-hdwallet-provider")
const ganache = require("ganache-cli")
const fs = require("fs")

const getMnemonic = () => fs.readFileSync("./seed", "utf8").trim()
const withMnemonic = rpcUrl => new HDWalletProvider(getMnemonic(), rpcUrl)

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
      provider: withMnemonic("https://rinkeby.infura.io/"),
      network_id: 4,
    },
  },
}
