const express = require('express')
const app = express();
const genresRouter = require('./routes/genres')
const customerRouter = require('./routes/Customers')
const mongoose = require('mongoose')
//middlewares

app.use(express.json());
app.use('/api/genres',genresRouter);
app.use('/api/customer',customerRouter);

//connect to db 
mongoose.connect("mongodb://127.0.0.1/vidly-api")
.then(()=>console.log('connnected successfully to db'))
.catch((err)=>console.log(err))

//server 
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})