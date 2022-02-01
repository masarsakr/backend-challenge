const notesService = require('app/modules/notes')

exports.postNote = async (req, res) => {
  const result = await notesService.createNote(req.body)
  res.status(201).send(result)
}
