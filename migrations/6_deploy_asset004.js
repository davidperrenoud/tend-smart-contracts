const TendCertifier = artifacts.require("TendCertifier")
const AssetToken004 = artifacts.require("AssetToken004")
const ExperienceCertifier004 = artifacts.require("ExperienceCertifier004")
const ExperienceToken004 = artifacts.require("ExperienceToken004")

module.exports = (deployer, network, accounts) => {
  deployer
    .deploy(TendCertifier, { overwrite: false })
    .then(() =>
      deployer.deploy(AssetToken004, TendCertifier.address)
    )
    .then(() => deployer.deploy(ExperienceCertifier004))
    .then(() =>
      deployer.deploy(
        ExperienceToken004,
        TendCertifier.address,
        ExperienceCertifier004.address
      )
    )
    .catch(console.error)
}
