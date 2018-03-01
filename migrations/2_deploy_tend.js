const TendAssets = artifacts.require("TendAssets")
const TendCertifier = artifacts.require("TendCertifier")

module.exports = (deployer, network, accounts) => {
  deployer.deploy(TendAssets)
  deployer.deploy(TendCertifier)
}
