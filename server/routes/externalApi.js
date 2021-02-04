const router = require('express').Router()
const externalApiController = require('../controllers/externalApiController')

router.get('/dataHospital',externalApiController.getDataHospital)

module.exports = router
