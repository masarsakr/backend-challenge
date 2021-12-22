let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('read-by-id', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().get(`/user/${globalAuth.user}`).expect(401).promise()
      })

      it('should read user', async () => {
        const user = await agent
          .client()
          .get(`/user/${globalAuth.user}`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(user)
        user.id.should.equal(globalAuth.user)
      })

      it('user id must match user in URL to be successful', async () => {
        const user = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(user)
        user.id.should.equal(globalAuth.user)
      })

      it('must get all notes for user', async () => {
        const createdNotes = await mockData.mockNotes(globalAuth.user)
        const notes = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()

        should.exist(notes)
        createdNotes[0].user.should.equal(globalAuth.user)
        createdNotes[0].title.should.equal('First Note')
        createdNotes[0].message.should.equal('This is note #1')

        createdNotes[1].user.should.equal(globalAuth.user)
        createdNotes[1].title.should.equal('Second Note')
        createdNotes[1].message.should.equal('This is note #2')
      })
    })
  })
})
