const { Model } = require('app/modules/common')

class NotesModel extends Model {
  schema() {
    return {
      user: {
        type: String,
        ref: 'User',
        required: true,
        index: true
      },
      title: {
        type: String,
        trim: true,
        required: true
      },
      message: {
        type: String,
        trim: true,
        required: true
      }
    }
  }
}

module.exports = NotesModel
