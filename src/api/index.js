const express = require('express')
const router = express.Router()

const registerApi = require('./register')
const loginApi = require('./login')
const paymentApi = require('./payment')

router.use(registerApi)
router.use(loginApi)
router.use(paymentApi)

module.exports = router