const express = require('express')
const router = express.Router();
const Joi =require('joi')
const { genres } = require('../db')


//route handler
router.get('/',(req,res)=>{
    res.send(genres);
})
router.get('/:id',(req,res)=>{
    const genreId = req.params.id
    const genre = genres.find((gen)=>gen.id == genreId)
    if(!genre)
    {
        return res.send('genre is not found')
    }
    res.send(genre);
})
router.post('/',(req,res)=>{
   const {error} = validateGenre(req.body);
   if(error) return res.send(error.details[0].message)
   
   const genre= {
    id:genres.length +1,
    name:req.body.name
   }
   genres.push(genre);
    res.send(genres);
})
router.put('/:id',(req,res)=>{
    const genreId = req.params.id
    const genre = genres.find((gen)=>gen.id == genreId)
    if(!genre) return res.send('genre is not found')
    
   const {error} = validateGenre(req.body);
   if(error)
   {
    return res.send(error.details[0].message)
   }
  
   
   genre.name = req.body.name
    res.send(genres);
})
router.delete('/:id',(req,res)=>{
    const genreId = req.params.id
    const genre = genres.find((gen)=>gen.id == genreId)
    if(!genre) return res.send('genre is not found')
    
    const index= genres.indexOf(genre);
    genres.splice(index,1)
   
    res.send(genre);
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