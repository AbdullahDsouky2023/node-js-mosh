const mongoose = require('mongoose')
const {genreSchema} = require('./Genres')
const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        lowercase:true,
        minlength:3,
        maxlength:100
    },
    numbreInStock:{
        required:true,
        type:Number,
        default:0
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        default:0
    },
    genre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Genres"
    }
})

const Movie = mongoose.model('Movies',movieSchema)
module.exports = Movie