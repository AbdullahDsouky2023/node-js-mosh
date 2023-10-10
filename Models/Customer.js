const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true,
        minlength:3,
        maxlength:100
    },
    phone:{
        required:false,
        type:Number,
        
    },
    isGold:{
        type:Boolean,
        required:true
    }
})

const Customer = mongoose.model('Customers',CustomerSchema)
module.exports = Customer