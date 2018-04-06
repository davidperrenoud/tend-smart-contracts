const TendCertifier = artifacts.require("TendCertifier")
const AssetToken005 = artifacts.require("AssetToken005")
const ExperienceCertifier005 = artifacts.require("ExperienceCertifier005")
const ExperienceToken005 = artifacts.require("ExperienceToken005")

module.exports = (deployer, network, accounts) => {
  deployer
    .deploy(TendCertifier, { overwrite: false })
    .then(() =>
      deployer.deploy(AssetToken005, TendCertifier.address)
    )
    .then(() => deployer.deploy(ExperienceCertifier005))
    .then(() =>
      deployer.deploy(
        ExperienceToken005,
        TendCertifier.address,
        ExperienceCertifier005.address
      )
    )
    .catch(console.error)
}
