const TendAssets = artifacts.require("./TendAssets.sol")
const TendCertifier = artifacts.require("./TendCertifier.sol")
const AssetToken = artifacts.require("./AssetToken.sol")
const ExperienceCertifier = artifacts.require("./ExperienceCertifier.sol")
const ExperienceToken = artifacts.require("./ExperienceToken.sol")

module.exports = (deployer, network, accounts) => {
  deployer
    .deploy(TendAssets)
    .then(() => deployer.deploy(TendCertifier))
    .then(() =>
      deployer.deploy(AssetToken, TendCertifier.address, 10, accounts[0])
    )
    .then(() => deployer.deploy(ExperienceCertifier))
    .then(() =>
      deployer.deploy(
        ExperienceToken,
        TendCertifier.address,
        ExperienceCertifier.address,
        10,
        accounts[0]
      )
    )
    .catch(console.error)
}
