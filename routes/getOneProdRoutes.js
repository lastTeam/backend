const express = require ('express')
const getProdByid = require('../controllers/getOneProduct.js')
const getProdByIdRouter = express.Router()
getProdByIdRouter.get('/getProd/:id' ,getProdByid )
module.exports = getProdByIdRouter