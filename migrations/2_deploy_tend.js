const TendAssets = artifacts.require("./TendAssets.sol")
const TendCertifier = artifacts.require("./TendCertifier.sol")

module.exports = (deployer, network, accounts) => {
  deployer.deploy(TendAssets)
  deployer.deploy(TendCertifier)
}
