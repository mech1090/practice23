const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'Password is requied']
    }
},
{
    collection:'Practice23 user'
})

const User = mongoose.model('User',userSchema)

module.exports = User