const express = require('express')
const router = express.Router();
const Joi =require('joi')
const Movie= require('../Models/movies')
const Genre= require('../Models/Genres')
//route handler
router.get('/',async(req,res)=>{
    try {
        const movies= await Movie.find()
        res.send(movies);
    }catch(err)
    {
        res.send(err.message)
    }
})
router.get('/:id',async(req,res)=>{
    try {

        const MovieId = req.params.id
        const movie = await Movie.findById(MovieId)
        if(!movie)
        {
            return res.send('Movie is not found')
        }
        res.send(movie);
    }catch(err)
    {
        console.log(err)
    }
})
router.post('/',async(req,res)=>{
try {

    const {error} = validateMovie(req.body);
    if(error) return res.send(error.details[0].message)
    
    const movie= new Movie({
        title:req.body.title,
        numbreInStock:req.body.numbreInStock,
        dailyRentalRate:req.body.dailyRentalRate,
        genre:new Genre({
            name:req.body.genre.name
        }),
    })
    const result = await movie.save()
    res.send(result);
}catch(err)
{
   res.send(err.message).status(404)
}
})
router.put('/:id',async(req,res)=>{
    try {

        const MovieID = req.params.id
        const movie = await Movie.findById(MovieID)
        if(!movie) return res.send('Movie is not found')
        
        const {error} = validateMovie(req.body);
        if(error)
        {
            return res.send(error.details[0].message)
        }
        
   
        movie.title = req.body.title
        movie.numbreInStock = req.body.numbreInStock
        movie.dailyRentalRate = req.body.dailyRentalRate
        movie.genre = req.body.genre
        const result = await movie.save()
        res.send(result);
    }catch(err)
    {
        res.send(err.message)
    }
})
router.delete('/:id',async(req,res)=>{
    try {

        const MovieId = req.params.id
        const movie = await  Movie.deleteOne( {_id :MovieId})
        if(!movie) return res.send('Movie is not found')
        res.send(movie);
    }catch(err)
    {
        console.log(err)
    }
})

//functions
function validateMovie(Movie){
    const schema=Joi.object({
        title:Joi.string().min(5).required(),
        numbreInStock:Joi.number().min(10).required(),
        dailyRentalRate:Joi.number().required(),
        genre:Joi.object({
            name:Joi.string().min(5).required()
        })
    })
    return schema.validate(Movie)
}
//server 
module.exports = router