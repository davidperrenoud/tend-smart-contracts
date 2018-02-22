const ExperienceCertifier = artifacts.require("ExperienceCertifier")

contract("ExperienceCertifier", async accounts => {
  const admin = accounts[0]
  const user1 = accounts[1]
  const user2 = accounts[2]

  it("is correctly initialised", async () => {
    const experienceCertifier = await ExperienceCertifier.deployed()

    const certified = await experienceCertifier.certified.call(admin)
    assert.equal(certified, false, "The admin should not be certified")
  })

  it("is owned by admin", async () => {
    const experienceCertifier = await ExperienceCertifier.deployed()

    const owner = await experienceCertifier.owner.call()
    assert.equal(owner, admin, "The owner of the contract should be the admin")
  })

  it("allows admin to certify and revoke user1", async () => {
    const experienceCertifier = await ExperienceCertifier.deployed()

    const certified1 = await experienceCertifier.certified.call(user1)
    assert.equal(certified1, false, "user1 should not be certified initially")

    await experienceCertifier.certify(user1)
    const certified2 = await experienceCertifier.certified.call(user1)
    assert.equal(certified2, true, "user1 should be certified")

    await experienceCertifier.revoke(user1)
    const certified3 = await experienceCertifier.certified.call(user1)
    assert.equal(certified3, false, "user1 should be revoked")
  })

  it("doesn't allow user1 to certify user2", async () => {
    const experienceCertifier = await ExperienceCertifier.deployed()

    experienceCertifier
      .certify(user1, { from: user2 })
      .then(() => assert.fail("This should have failed"))
      .catch(() => {})

    const certified = await experienceCertifier.certified.call(user2)
    assert.equal(certified, false, "user2 should not be certified")
  })

  it("doesn't allow user1 to revoke user2", async () => {
    const experienceCertifier = await ExperienceCertifier.deployed()

    await experienceCertifier.certify(user1)

    experienceCertifier
      .revoke(user1, { from: user2 })
      .then(() => assert.fail("This should have failed"))
      .catch(() => {})

    const certified = await experienceCertifier.certified.call(user1)
    assert.equal(certified, true, "user1 should be certified")
  })
})
