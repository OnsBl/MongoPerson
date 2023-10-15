
const mongoose = require('mongoose')
require('dotenv').config()
const connect=()=>{
try {
    mongoose.connect(process.env.MONGOURL)
    console.log("connection successful")

} catch (error) {
    throw new Error("Couldn't connect to Mongo")
}
}

module.exports=connect