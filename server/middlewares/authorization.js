const { Todo } = require('../models/index')

const authorize = function (req, res, next) {
    Todo.findOne({ where: { id: req.params.id } })
        .then((data) => {
            if (!data) {
                throw { name: 'ClientError', msg: 'Data Not Found', status: 404 }
            } else if (data.UserId !== req.decoded.id) {
                throw { name: 'ClientError', msg: 'You dont have authorization to access', status: 401 }
            } else {
                next();
            }
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = authorize