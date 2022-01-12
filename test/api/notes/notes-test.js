let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('note', () => {
    let globalEmail
    let globalPassword
    let globalAuth

    before(async () => {
      globalEmail = `${mockData.uuid()}@test.com`
      globalPassword = mockData.uuid()
      globalAuth = await mockData.mockAuthAndUser({
        email: globalEmail,
        password: await mockData.hash(globalPassword)
      })
    })

    it('should create a note for a user', async () => {
      const body = {
        email: globalEmail,
        title: 'Note for user 1',
        message: 'this is a message, its the first'
      }
      const { note, user } = await agent
        .client()
        .post('/note')
        .set('authorization', globalAuth.token)
        .send(body)
        .expect(201)
        .promise()

      should.exist(user)
      should.exist(note)

      user.email.should.equal(globalEmail)
      note.title.should.equal(body.title)
      note.message.should.equal(body.message)
    })
  })
})
