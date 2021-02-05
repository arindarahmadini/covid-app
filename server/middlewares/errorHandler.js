module.exports = (err, req, res, next) => {
  console.log(err)
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    let errorMsg = []
    err.errors.forEach(el => {
      errorMsg.push(el.message)
    })
    res.status(400).json({ error: errorMsg })
  } else if (err.name === 'ClientError') {
    res.status(err.status).json({ error: err.msg })
  } else {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}