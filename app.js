const express = require('express')
const app = express();
const genresRouter = require('./routes/genres')
const customerRouter = require('./routes/Customers')
const movieRouter = require('./routes/movies')
const rentalsRouter = require('./routes/rentals')
const registerRouter = require('./routes/register')
const auth = require('./routes/auth')
const mongoose = require('mongoose')
const config = require('./config');

if(!config.jwtSecret){
    process.exit(1)
}
//middlewares

app.use(express.json());
app.use('/api/genres',genresRouter);
app.use('/api/customer',customerRouter);
app.use('/api/movies',movieRouter);
app.use('/api/rentals',rentalsRouter);
app.use('/api/register',registerRouter);
app.use('/api/auth',auth);

//connect to db 
mongoose.connect("mongodb://127.0.0.1/vidly-api")
.then(()=>console.log('connnected successfully to db'))
.catch((err)=>console.log(err))

//server 
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})