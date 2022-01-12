const { validate, Validator } = require('app/api/common')
const { body } = validate

class NotesValidator extends Validator {
  async create(req) {
    const validations = [
      body('title').notEmpty().isLength(1, 64),
      body('message').notEmpty(),
      body('email').notEmpty().isLength(1, 64)
    ]
    await this.validate(req, validations, { sanitize: 'query' })
  }
}

module.exports = new NotesValidator()
