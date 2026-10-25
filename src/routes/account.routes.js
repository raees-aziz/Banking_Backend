const express = require('express')
const {authChecker} = require('../middleware/auth.middleware')
const {createAccountUser}=require('../controller/account.controller')
const router = express.Router()


router.post("/",authChecker)
router.post("/create",authChecker,createAccountUser)


module.exports=router