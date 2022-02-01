const { Service } = require('app/modules/common')
const userService = require('app/modules/user')
const { BadRequestError } = require('app/lib/errors')

class NotesService extends Service {
  async createNote({ email, title, message }) {
    if (!email) throw new Error('email is required')
    if (!title) throw new Error('title is required')
    if (!message) throw new Error('message is required')

    const user = await userService.findOne({ email: sanitizeEmail(email) })
    if (!user) throw new BadRequestError('This email does not exist, please Sign Up for a new account.')

    const note = await this.create({
      user: user.id,
      title: title,
      message: message
    })

    return { note, user }
  }
}

function sanitizeEmail(input) {
  return String(input).trim().toLowerCase()
}

module.exports = NotesService
