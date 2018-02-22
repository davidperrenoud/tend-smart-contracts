const TendAssets = artifacts.require("TendAssets")
const TendCertifier = artifacts.require("TendCertifier")
const AssetToken = artifacts.require("AssetToken")

contract("AssetToken", async accounts => {
  const admin = accounts[0]
  const user1 = accounts[1]
  const user2 = accounts[2]
  const totalSupply = 10
  const tokenHolder = accounts[0]

  it("is correctly initialised", async () => {
    const assetToken = await AssetToken.deployed()
    const tendCertifier = await TendCertifier.deployed()

    const tendCertifierContract = await assetToken.tendCertifierContract.call()
    assert.equal(
      tendCertifierContract,
      tendCertifier.address,
      "tendCertifierContract is not correct address"
    )

    const experienceTokenContractsLength = await assetToken.getExperienceTokenContractsLength.call()
    assert.equal(
      experienceTokenContractsLength,
      0,
      "There should be no experience tokens"
    )

    const pastHoldersLength = await assetToken.getPastHoldersLength.call()
    assert.equal(pastHoldersLength, 0, "There should be no past holders")

    const documentHashesLength = await assetToken.getDocumentHashesLength.call()
    assert.equal(documentHashesLength, 0, "There should be no document hashes")

    const adminBalance = await assetToken.balanceOf.call(admin)
    assert.equal(
      adminBalance,
      totalSupply,
      "The admin should have the total supply of tokens"
    )
  })

  it("is owned by admin", async () => {
    const assetToken = await AssetToken.deployed()

    const owner = await assetToken.owner.call()
    assert.equal(owner, admin, "The owner of the contract should be the admin")
  })
})
