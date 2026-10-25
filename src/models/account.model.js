const mongoose = require('mongoose')

const {Schema,model}=mongoose


const accountSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Account must be associated with a user"],
        index:true,
    },
    status:{
        type:String,
        enum:{
            values:["ACTIVE","FREEZE","CLOSE"],
            message:"Status can be either ACTIVE, FROZEN or CLOSED"
        }
    },
    currency:{
        type:String,
         required:[true,"Currency is required for create Account"],
         default:'PKR'
    }
},{timestamps:true}
)
accountSchema.index({user:1,status:1})

const accountModel=model('account',accountSchema)

model.exports=accountModel