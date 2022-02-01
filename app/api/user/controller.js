const userService = require('app/modules/user')
const notesService = require('app/modules/notes')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(200).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {
  const user = await userService.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).send(user)
}

/**
 * @method read all notes for a user
 */
exports.getNotes = async (req, res) => {
  const notes = await notesService.find({ user: req.params.id })
  res.status(200).send(notes)
}
