const userModel = require('../models/user.model')


async function userRegister(req,res){

    const {email,password,name}=req.body

    const isExist = await userModel.findOne({
        
    })
}


module.exports={userRegister}