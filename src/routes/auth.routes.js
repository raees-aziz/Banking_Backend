const express = require('express')
const {userRegister}=require('../controller/auth.controller')
const router = express.Router()


router.post('/register',userRegister)

module.exports=router