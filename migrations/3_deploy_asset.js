const TendAssets = artifacts.require("./TendAssets.sol")
const TendCertifier = artifacts.require("./TendCertifier.sol")
const AssetToken = artifacts.require("./AssetToken.sol")

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(TendCertifier)
  deployer.deploy(AssetToken, TendCertifier.address, 10, accounts[0])
}
