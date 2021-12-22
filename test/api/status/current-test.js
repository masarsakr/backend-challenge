let should
let agent
// let mockDB

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  // mockDB = require('test/lib/mock-db')
})

describe('api', () => {
  describe('status', () => {
    describe('current', () => {
      it('should read user, mongo connected, should return OK', async () => {
        const result = await agent.client().get('/status').expect(200).promise()
        should.exist(result)
        result.status.should.equal('OK')
      })

      // it('should read user, mogngo disconnected, return 500', async () => {
      //   await mockDB.disconnect()
      //
      //   const result = await agent.client().get('/status').expect(500).promise()
      //   should.exist(result)
      //   result.status.should.equal('Internal Server Error: no DB')
      //
      //   await require('test/lib/mock-db').reset()
      // })
    })
  })
})
