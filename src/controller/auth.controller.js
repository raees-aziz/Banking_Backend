const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken')


// post /api/auth/register
async function userRegister(req, res) {
    const { email, password, name } = req.body;
    
    const isExist = await userModel.findOne({email});
    
    if (isExist)
        return res
      .status(422)
      .json({ message: "User Already Exists with email", status: "Failed" });
      
      const user = await userModel.create({email, password, name})
      const token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"3d"})
      res.cookie("token",token)
      res.status(201).json({message:user,token:token})
    }
    
    // post /api/auth/login

    async function userLogin(req,res){
        const { email, password } = req.body;
    
    const user = await userModel.findOne({email});
    if (!user) return res.status(401).json({ message: "Email or Password Invalid" });

    const isValidPassword = await user.comparePassword(password)    
    if (!isValidPassword) return res.status(401).json({ message: "Email or Password Invalid" });
    
     const token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"3d"})
      res.cookie("token",token)
      res.status(200).json({message:user,token:token})
}
    
    
    module.exports = { userRegister,userLogin };
