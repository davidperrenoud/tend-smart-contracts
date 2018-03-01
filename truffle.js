const HDWalletProvider = require("truffle-hdwallet-provider")
const ganache = require("ganache-cli")
const fs = require("fs")

const appRoot = process.cwd()
const getMnemonic = () => fs.readFileSync(`${appRoot}/seed`, "utf8").trim()
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
      get provider() {
        return withMnemonic("https://rinkeby.infura.io/")
      },
      network_id: 4,
      from: "0x65882eb263d60ada260df66ee960177b3569d0bb",
    },
  },
}
