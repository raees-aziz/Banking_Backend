const mongoose = require('mongoose')

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        console.log("MongoDB Conneted")
    } catch (error) {
        console.log(error)
        console.log("MongoDB Not Conneted Error In Database")
    }
}

module.exports=connectToDB