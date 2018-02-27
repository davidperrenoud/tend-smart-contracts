const TendAssets = artifacts.require("./TendAssets.sol")
const TendCertifier = artifacts.require("./TendCertifier.sol")
const AssetToken = artifacts.require("./AssetToken.sol")
const ExperienceCertifier = artifacts.require("./ExperienceCertifier.sol")
const ExperienceToken = artifacts.require("./ExperienceToken.sol")

module.exports = async (deployer, network, accounts) => {
  await TendCertifier.deployed()
  await deployer.deploy(ExperienceCertifier)
  deployer.deploy(
    ExperienceToken,
    TendCertifier.address,
    ExperienceCertifier.address,
    10,
    accounts[0]
  )
}
