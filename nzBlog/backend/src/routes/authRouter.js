const express = require('express')
const app = express()

const authController = require('../controllers/authController')
app.post('/register', authController.register)

module.exports = app