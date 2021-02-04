const router = require('express').Router()
const Controller = require('../controllers/userController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authenticate)
router.get('/datacovid', Controller.dataCovid)
// router.post('/updateuser', authorize, Controller.dataCovid)
// router.put('/updateuserprovince', authorize, Controller.dataCovid)

module.exports = router