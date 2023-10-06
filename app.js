const express = require('express')
const app = express();
const Joi =require('joi')
const { genres } = require('./db')
//middlewares

app.use(express.json());

//route handler
app.get('/api/genres',(req,res)=>{
    res.send(genres);
})
app.get('/api/genres/:id',(req,res)=>{
    const genreId = req.params.id
    const genre = genres.find((gen)=>gen.id == genreId)
    if(!genre)
    {
        return res.send('genre is not found')
    }
    res.send(genre);
})
app.post('/api/genres/',(req,res)=>{
   const {error} = validateGenre(req.body);
   if(error) return res.send(error.details[0].message)
   
   const genre= {
    id:genres.length +1,
    name:req.body.name
   }
   genres.push(genre);
    res.send(genres);
})
app.put('/api/genres/:id',(req,res)=>{
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
app.delete('/api/genres/:id',(req,res)=>{
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
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})