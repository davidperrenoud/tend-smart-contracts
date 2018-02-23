const assertRevert = require("./helpers/assertRevert")

const TendCertifier = artifacts.require("TendCertifier")

contract("TendCertifier", async accounts => {
  const admin = accounts[0]
  const user1 = accounts[1]
  const user2 = accounts[2]

  it("initialises correctly", async () => {
    const tendCertifier = await TendCertifier.deployed()

    const certified = await tendCertifier.certified(admin)
    assert.equal(certified, false, "The admin should not be certified")
  })

  it("is owned by admin", async () => {
    const tendCertifier = await TendCertifier.deployed()

    const owner = await tendCertifier.owner()
    assert.equal(owner, admin, "The owner of the contract should be the admin")
  })

  it("allows admin to certify and revoke user1", async () => {
    const tendCertifier = await TendCertifier.deployed()

    const certified1 = await tendCertifier.certified(user1)
    assert.equal(certified1, false, "user1 should not be certified initially")

    await tendCertifier.certify(user1)
    const certified2 = await tendCertifier.certified(user1)
    assert.equal(certified2, true, "user1 should be certified")

    await tendCertifier.revoke(user1)
    const certified3 = await tendCertifier.certified(user1)
    assert.equal(certified3, false, "user1 should be revoked")
  })

  it("prevents user1 to certify user2", async () => {
    const tendCertifier = await TendCertifier.deployed()

    const owner = await tendCertifier.owner()
    assert.isTrue(owner !== user1)

    await assertRevert(tendCertifier.certify(user2, { from: user1 }))

    const certified = await tendCertifier.certified(user2)
    assert.equal(certified, false, "user2 should not be certified")
  })

  it("prevents user1 to revoke user2", async () => {
    const tendCertifier = await TendCertifier.deployed()

    await tendCertifier.certify(user2)

    const owner = await tendCertifier.owner()
    assert.isTrue(owner !== user1)

    await assertRevert(tendCertifier.revoke(user2, { from: user1 }))

    const certified = await tendCertifier.certified(user2)
    assert.equal(certified, true, "user2 should be certified")
  })
})
