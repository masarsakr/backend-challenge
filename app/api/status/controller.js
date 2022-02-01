const mongodb = require('app/lib/mongodb')

exports.currentStatus = function (req, res) {
  const readyState = mongodb.readyState
  // checking for both connected and connecting because it seems to be lazy loaded
  // usually fails on first attempt if looking for only connected (i.e. 1)
  if (readyState === 1 || readyState === 2) {
    res.status(200).send({
      status: 'OK'
    })
  } else {
    res.status(500).send({
      status: 'Internal Server Error: no DB'
    })
  }
}
