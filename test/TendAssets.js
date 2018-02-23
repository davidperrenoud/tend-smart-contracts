const TendAssets = artifacts.require("TendAssets")

contract("TendAssets", async accounts => {
  const admin = accounts[0]
  const user1 = accounts[1]
  const user2 = accounts[2]

  it("initialises correctly", async () => {
    const tendAssets = await TendAssets.deployed()

    const count = await tendAssets.getAssetTokenContractsLength()
    assert.equal(count.toNumber(), 0, "There should be no asset tokens")
  })

  it("is owned by admin", async () => {
    const tendAssets = await TendAssets.deployed()

    const owner = await tendAssets.owner()
    assert.equal(owner, admin, "The owner of the contract should be the admin")
  })
})
