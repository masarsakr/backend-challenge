const mongodb = require('app/lib/mongodb')

class MockDB {
  /**
   * Wipes the test db so have a clean start for our tests
   *
   * @method reset
   */
  async reset() {
    const { client, db } = await mongodb.createConnection()
    await db.dropDatabase()
    await client.close()
  }

  async disconnect() {
    await mongodb.disconnect()
  }

  async connect() {
    await mongodb.connect()
  }
}

module.exports = new MockDB()
