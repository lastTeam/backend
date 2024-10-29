const express = require ('express')
const getProdBytitle = require('../controllers/getOneProduct.js')
const getProdBytitleRouter = express.Router()
getProdBytitleRouter.get('/getProd/:title' ,getProdBytitle)
module.exports = getProdBytitleRouter 