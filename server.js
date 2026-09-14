require('dotenv').config()
const connectToDB=require('./src/config/db')
const app = require('./src/app')


connectToDB()

app.listen(3000,()=>{
    console.log("Server Running on this Port 3000")
})