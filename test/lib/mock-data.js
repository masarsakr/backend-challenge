const bcrypt = require('bcryptjs')
const { v4: uuid } = require('uuid')
const authService = require('app/modules/auth')
const userService = require('app/modules/user')
const notesService = require('app/modules/notes')

class MockData {
  /**
   * @method uuid
   */
  uuid() {
    return uuid(...arguments)
  }

  /**
   * @method hash
   */
  hash(input) {
    return bcrypt.hash(input, authService.SALT_WORK_FACTOR)
  }

  /**
   * @method mockAuthAndUser
   */
  async mockAuthAndUser(options = {}) {
    const user = await this.mockUser(options)
    const auth = await this.mockAuth({ ...options, user: user.id })
    return auth
  }

  /**
   * @method mockAuth
   */
  mockAuth(options = {}) {
    const data = Object.assign(
      {
        token: uuid(),
        user: uuid(),
        password: uuid()
      },
      options
    )
    return authService.create(data)
  }

  /**
   * @method mockUser
   */
  mockUser(options = {}) {
    const data = Object.assign(
      {
        email: `${uuid()}@test.com`,
        firstName: 'John',
        lastName: 'Doe'
      },
      options
    )
    return userService.create(data)
  }

  /**
   * @method mockNotes
   *
   */
  mockNotes(userId) {
    const notes = [
      {
        user: userId,
        title: 'First Note',
        message: 'This is note #1'
      },
      {
        user: userId,
        title: 'Second Note',
        message: 'This is note #2'
      }
    ]
    return notesService.create(notes)
  }
}

module.exports = new MockData()
