const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email Already Exist"],
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  name: {
    type: String,
    required: [true, "Name is required for creating an account"],
  },
  password: {
    type: String,
    required: [true, "Password is required for creating an account"],
    minlength: [6, "password should contain more than 6 character"],
    select:false,
  }
},{timestamps:true});


userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    const hash = await bcrypt.hash(this.password,10)
    this.password=hash
    return next()
})

userSchema.method.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

const userModel = model('user',userSchema)
module.exports=userModel