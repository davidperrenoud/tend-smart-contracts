const TendCertifier = artifacts.require("TendCertifier")
const AssetToken001 = artifacts.require("AssetToken001")
const ExperienceCertifier001 = artifacts.require("ExperienceCertifier001")
const ExperienceToken001 = artifacts.require("ExperienceToken001")

module.exports = (deployer, network, accounts) => {
  deployer
    .deploy(TendCertifier, { overwrite: false })
    .then(() =>
      deployer.deploy(AssetToken001, TendCertifier.address)
    )
    .then(() => deployer.deploy(ExperienceCertifier001))
    .then(() =>
      deployer.deploy(
        ExperienceToken001,
        TendCertifier.address,
        ExperienceCertifier001.address
      )
    )
    .catch(console.error)
}
