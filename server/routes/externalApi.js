const router = require('express').Router()
const externalApiController = require('../controllers/externalApiController')

router.get('/dataHospital/:province',externalApiController.getDataHospital)

module.exports = router
