const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const userWithEmail = await User.findOne({
    where: {
      email
    }
  }).catch((err) => {
    console.log('Error: ', err)
  })

  if (!userWithEmail) {
    return res.json({
      message: 'Email or password does not match!'
    })
  }

  if (userWithEmail.password !== password) {
    return res.json({
      message: 'Email or password does not match!'
    })
  }

  const jwtToken = jwt.sign({
    id: userWithEmail.id,
    email: userWithEmail.email,
    fullName: userWithEmail.fullName,
  }, process.env.JWT_SECRET);

  res.json({
    message: 'Welcome Back!',
    token: jwtToken
  })
})

module.exports = router