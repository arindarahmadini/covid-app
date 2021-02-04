const { User } = require('../models/index')

const authorize = function (req, res, next) {
    User.findOne({ where: { email: req.decoded.email } })
        .then((data) => {
            if (!data) {
                throw { name: 'ClientError', msg: 'Data Not Found', status: 404 }
            }
            next();
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = authorize