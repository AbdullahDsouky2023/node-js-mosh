const express = require('express')
const router = express.Router();
const Joi =require('joi')
const Genre= require('../Models/Genres')
//route handler
router.get('/',async(req,res)=>{
    try {
        const genres= await Genre.find()
        res.send(genres);
    }catch(err)
    {
        console.log(err)
    }
})
router.get('/:id',async(req,res)=>{
    try {

        const genreId = req.params.id
        const genre = await Genre.findById(genreId)
        if(!genre)
        {
            return res.send('genre is not found')
        }
        res.send(genre);
    }catch(err)
    {
        console.log(err)
    }
})
router.post('/',async(req,res)=>{
try {

    const {error} = validateGenre(req.body);
    if(error) return res.send(error.details[0].message)
    
    const genre= new Genre({
        name:req.body.name
    })
    const result = await genre.save()
    res.send(result);
}catch(err)
{
    console.log(err)
}
})
router.put('/:id',async(req,res)=>{
    try {

        const genreId = req.params.id
        const genre = await Genre.findById(genreId)
        if(!genre) return res.send('genre is not found')
        
        const {error} = validateGenre(req.body);
        if(error)
        {
            return res.send(error.details[0].message)
        }
        
   
        genre.name = req.body.name
        const result = await genre.save()
        res.send(genre);
    }catch(err)
    {
        console.log(err)
    }
})
router.delete('/:id',async(req,res)=>{
    try {

        const genreId = req.params.id
        const genre = await  Genre.deleteOne( {_id :genreId})
        if(!genre) return res.send('genre is not found')
        res.send(genre);
    }catch(err)
    {
        console.log(err)
    }
})

//functions
function validateGenre(genre){
    const schema=Joi.object({
        name:Joi.string().min(5).required()
    })
    return schema.validate(genre)
}
//server 
module.exports = router