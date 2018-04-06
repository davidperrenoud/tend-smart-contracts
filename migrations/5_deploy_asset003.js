const TendCertifier = artifacts.require("TendCertifier")
const AssetToken003 = artifacts.require("AssetToken003")
const ExperienceCertifier003 = artifacts.require("ExperienceCertifier003")
const ExperienceToken003 = artifacts.require("ExperienceToken003")

module.exports = (deployer, network, accounts) => {
  deployer
    .deploy(TendCertifier, { overwrite: false })
    .then(() =>
      deployer.deploy(AssetToken003, TendCertifier.address)
    )
    .then(() => deployer.deploy(ExperienceCertifier003))
    .then(() =>
      deployer.deploy(
        ExperienceToken003,
        TendCertifier.address,
        ExperienceCertifier003.address
      )
    )
    .catch(console.error)
}
