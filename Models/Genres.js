const mongoose = require('mongoose')

const genresSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true,
        minlength:3,
        maxlength:100
    }
})

const Genre = mongoose.model('Genres',genresSchema)
module.exports = Genre
