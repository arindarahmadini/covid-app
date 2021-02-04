const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const axios = require('axios')

class UserController {
    static register(req, res, next) {
        const { name, email, password, province } = req.body
        User.create({ name, email, password, province })
            .then(user => {
                res.status(201).json({ msg: 'Register Success', id: user.id, name: user.name, email: user.email, province: user.province })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (!user) throw { name: 'ClientError', msg: 'Invalid email or password!', status: 400 }
                const comparedPassword = comparePass(password, user.password)
                if (!comparedPassword) throw { name: 'ClientError', msg: 'Invalid email or password!', status: 400 }
                const access_token = generateToken({
                    id: user.id,
                    email: user.email,
                    province: user.province
                })
                res.status(200).json({ access_token, province: user.province, name: user.name})
            })
            .catch(err => {
                next(err)
            })
    }

    static dataCovid(req, res, next) {
        const prov = req.params.provinsi
        console.log(prov)
        User.findOne({
            where: {
                province: prov
            }
        })
            .then(() => {
                return axios({
                    method: 'GET',
                    url: `https://api.kawalcorona.com/indonesia/provinsi/`
                })
            })
            .then(dataCovid => {
                let provinsi = ''
                dataCovid.data.forEach((el) => {
                    if (el.attributes.Provinsi === prov) {
                        provinsi = el.attributes
                    }
                })
                res.status(201).json(provinsi)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateDataUser(req, res, next) {
        const { name, password, province } = req.body
        User.update({ name, password, province },
            {
                where: {
                    email: req.decoded.email
                },
                returning: true
            })
            .then(user => {
                console.log(user)
                res.status(200).json({ msg: 'Update Success', name: user.name, password: user.password, province: user.province })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }


}

module.exports = UserController