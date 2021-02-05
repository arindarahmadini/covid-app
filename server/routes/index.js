const router = require('express').Router()
const Controller = require('../controllers/userController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const externalApi = require('./externalApi');

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/loginwithgoogle', Controller.logInWithGoogle)

router.use(authenticate)
router.get('/datacovid/:province', authorize, Controller.dataCovid)
router.put('/updateuser', authorize, Controller.updateDataUser)
router.use(externalApi)

module.exports = router