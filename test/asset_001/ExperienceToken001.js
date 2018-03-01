const assertRevert = require("../helpers/assertRevert")

const TendCertifier = artifacts.require("TendCertifier")
const AssetToken001 = artifacts.require("AssetToken001")
const ExperienceToken001 = artifacts.require("ExperienceToken001")
const ExperienceCertifier001 = artifacts.require("ExperienceCertifier001")

// Aliases for simplicity
const AssetToken = AssetToken001
const ExperienceToken = ExperienceToken001
const ExperienceCertifier = ExperienceCertifier001

contract("ExperienceToken001", async accounts => {
  const admin = accounts[0]
  const user1 = accounts[1]
  const user2 = accounts[2]
  const totalSupply = 10
  const tokenHolder = accounts[0]

  it("initialises correctly", async () => {
    const tendCertifier = await TendCertifier.deployed()
    const experienceToken = await ExperienceToken.deployed()
    const experienceCertifier = await ExperienceCertifier.deployed()

    const tendCertifierContract = await experienceToken.tendCertifierContract()
    assert.equal(
      tendCertifierContract,
      tendCertifier.address,
      "tendCertifierContract is not correct address"
    )

    const experienceCertifierContract = await experienceToken.experienceCertifierContract()
    assert.equal(
      experienceCertifierContract,
      experienceCertifier.address,
      "experienceCertifierContract is not correct address"
    )
  })

  it("adds an experience token to the asset token", async () => {
    const assetToken = await AssetToken.deployed()
    const experienceToken = await ExperienceToken.deployed()

    await assetToken.addExperienceTokenContract(experienceToken.address)

    const count = await assetToken.getExperienceTokenContractsLength()
    assert.equal(
      count,
      1,
      "There should be 1 experience token linked to this asset token"
    )

    const address = await assetToken.experienceTokenContracts(0)
    assert.equal(
      address,
      experienceToken.address,
      "The experience token address is not the one which was previously added"
    )
  })

  it("allows to transfer an experience token to a certified user", async () => {
    const tendCertifier = await TendCertifier.deployed()
    const experienceToken = await ExperienceToken.deployed()
    const experienceCertifier = await ExperienceCertifier.deployed()

    await tendCertifier.certify(user1)
    await experienceCertifier.certify(user1)

    const count = await experienceToken.getPendingTransfersLength()
    await experienceToken.transfer(user1, 1)
    await experienceToken.confirmTransfer(count.toNumber())

    const balance = await experienceToken.balanceOf(user1)
    assert.equal(balance.toNumber(), 1, "User1 should have 1 experience token")
  })

  it("removes an experience token from the asset token", async () => {
    const assetToken = await AssetToken.deployed()
    const experienceToken = await ExperienceToken.deployed()

    await assetToken.removeExperienceTokenContract(0)

    const address = await assetToken.experienceTokenContracts(0)
    assert.equal(address, 0x0, "The experience token address should be null")
  })
})
