const mongodb = require('app/lib/mongodb')

exports.currentStatus = function (req, res) {
  const readyState = mongodb.readyState
  if (readyState === 1) {
    res.status(200).send({
      status: 'OK'
    })
  } else {
    res.status(500).send({
      status: 'Internal Server Error: no DB'
    })
  }
}
