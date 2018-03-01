const assertRevert = require("../helpers/assertRevert")

const TendAssets = artifacts.require("TendAssets")
const TendCertifier = artifacts.require("TendCertifier")
const AssetToken = artifacts.require("AssetToken001")

contract("AssetToken001", async accounts => {
  const admin = accounts[0]
  const user1 = accounts[1]
  const user2 = accounts[2]
  const totalSupply = 10
  const tokenHolder = accounts[0]

  it("initialises correctly", async () => {
    const assetToken = await AssetToken.deployed()
    const tendCertifier = await TendCertifier.deployed()

    const tendCertifierContract = await assetToken.tendCertifierContract()
    assert.equal(
      tendCertifierContract,
      tendCertifier.address,
      "tendCertifierContract is not correct address"
    )

    const experienceTokenContractsLength = await assetToken.getExperienceTokenContractsLength()
    assert.equal(
      experienceTokenContractsLength.toNumber(),
      0,
      "There should be no experience tokens"
    )

    const pastHoldersLength = await assetToken.getPastHoldersLength()
    assert.equal(
      pastHoldersLength.toNumber(),
      0,
      "There should be no past holders"
    )

    const documentHashesLength = await assetToken.getDocumentHashesLength()
    assert.equal(
      documentHashesLength.toNumber(),
      0,
      "There should be no document hashes"
    )

    const adminBalance = await assetToken.balanceOf(admin)
    assert.equal(
      adminBalance.toNumber(),
      totalSupply,
      "The admin should have the total supply of tokens"
    )
  })

  it("is owned by admin", async () => {
    const assetToken = await AssetToken.deployed()

    const owner = await assetToken.owner()
    assert.equal(owner, admin, "The owner of the contract should be the admin")
  })

  describe("assets", async () => {
    it("adds an asset token to the TEND assets", async () => {
      const tendAssets = await TendAssets.deployed()
      const assetToken = await AssetToken.deployed()

      await tendAssets.addAsset(assetToken.address)

      const count = await tendAssets.getAssetTokenContractsLength()
      assert.equal(count.toNumber(), 1, "There should be 1 asset token")

      const address = await tendAssets.assetTokenContracts(0)
      assert.equal(
        address,
        assetToken.address,
        "The asset token address should be the one we just added"
      )
    })

    it("removes an asset token from the TEND assets", async () => {
      const tendAssets = await TendAssets.deployed()
      const assetToken = await AssetToken.deployed()

      const count = await tendAssets.getAssetTokenContractsLength()
      if (count === 0) {
        await tendAssets.addAsset(assetToken.address)
      } else if (count > 1) {
        assert.fail("There is more than 1 asset token, cannot continue")
      }

      await tendAssets.removeAsset(0)

      const newCount = await tendAssets.getAssetTokenContractsLength()
      assert.equal(
        newCount.toNumber(),
        1,
        "Deleting asset shouldn't change the asset count, it should still be at 1"
      )

      const deleted = await tendAssets.assetTokenContracts(0)
      assert.equal(deleted, 0x0, "The deleted asset should be null")
    })
  })

  describe("document hashes", async () => {
    it("adds a document hash", async () => {
      const assetToken = await AssetToken.deployed()

      const hash = "/ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv"
      await assetToken.addDocumentHash(hash)

      const result = await assetToken.documentHashes(0)
      assert.equal(
        result,
        hash,
        "The retrieved hash is not the one which was previously added"
      )
    })

    it("removes a document hash", async () => {
      const assetToken = await AssetToken.deployed()

      await assetToken.removeDocumentHash(0)

      const newCount = await assetToken.getDocumentHashesLength()
      assert.equal(
        newCount.toNumber(),
        1,
        "After deleting a hash the document hashes count should still be at 1"
      )

      const deleted = await assetToken.documentHashes(0)
      assert.equal(deleted, 0x0, "The deleted document hash should be null")
    })
  })

  describe("transfer", async () => {
    it("allows certified users to transfer assets to other certified users", async () => {
      const assetToken = await AssetToken.deployed()
      const tendCertifier = await TendCertifier.deployed()

      await tendCertifier.certify(user1)
      await tendCertifier.certify(user2)

      const count = await assetToken.getPendingTransfersLength()
      await assetToken.transfer(user1, 1)
      await assetToken.confirmTransfer(count)

      const balanceUser1 = await assetToken.balanceOf(user1)
      assert.equal(
        balanceUser1.toNumber(),
        1,
        "User1 should have received 1 asset token"
      )

      await assetToken.transfer(user2, 1, { from: user1 })
      await assetToken.confirmTransfer(count + 1)

      const balanceUser1b = await assetToken.balanceOf(user1)
      assert.equal(
        balanceUser1b.toNumber(),
        0,
        "User1 shouldn't have asset tokens anymore"
      )

      const balanceUser2 = await assetToken.balanceOf(user2)
      assert.equal(
        balanceUser2.toNumber(),
        1,
        "User2 should have received 1 asset token"
      )
    })

    it("allows uncertified users to transfer assets to certified users", async () => {
      const assetToken = await AssetToken.deployed()
      const tendCertifier = await TendCertifier.deployed()

      await tendCertifier.certify(user1)
      await tendCertifier.revoke(user2)

      const count = await assetToken.getPendingTransfersLength()
      await assetToken.transfer(user1, 1, { from: user2 })
      await assetToken.confirmTransfer(count.toNumber())

      const balanceUser1 = await assetToken.balanceOf(user1)
      assert.equal(
        balanceUser1.toNumber(),
        1,
        "User1 should have received 1 asset token"
      )

      const balanceUser2 = await assetToken.balanceOf(user2)
      assert.equal(
        balanceUser2.toNumber(),
        0,
        "User2 shouldn't have asset tokens anymore"
      )
    })

    it("prevents asset transfers to uncertified users", async () => {
      const assetToken = await AssetToken.deployed()
      const tendCertifier = await TendCertifier.deployed()

      await tendCertifier.certify(user1)
      await tendCertifier.revoke(user2)

      await assertRevert(assetToken.transfer(user2, 1, { from: user1 }))

      const balanceUser1 = await assetToken.balanceOf(user1)
      assert.equal(
        balanceUser1.toNumber(),
        1,
        "User1 should still have 1 asset token"
      )
    })

    it("cancels a pending transfer", async () => {
      const assetToken = await AssetToken.deployed()
      const tendCertifier = await TendCertifier.deployed()

      const count = await assetToken.getPendingTransfersLength()
      await assetToken.transfer(user1, 1)
      await assetToken.cancelTransfer(count)

      const balanceUser1 = await assetToken.balanceOf(user1)
      assert.equal(
        balanceUser1.toNumber(),
        1,
        "User1 should still have only 1 asset token"
      )
    })
  })
})
