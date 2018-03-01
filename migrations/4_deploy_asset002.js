const TendCertifier = artifacts.require("TendCertifier")
const AssetToken002 = artifacts.require("AssetToken002")
const ExperienceCertifier002 = artifacts.require("ExperienceCertifier002")
const ExperienceToken002 = artifacts.require("ExperienceToken002")

module.exports = (deployer, network, accounts) => {
  deployer
    .deploy(TendCertifier, { overwrite: false })
    .then(() =>
      deployer.deploy(AssetToken002, TendCertifier.address)
    )
    .then(() => deployer.deploy(ExperienceCertifier002))
    .then(() =>
      deployer.deploy(
        ExperienceToken002,
        TendCertifier.address,
        ExperienceCertifier002.address
      )
    )
    .catch(console.error)
}
