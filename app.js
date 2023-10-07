const express = require('express')
const app = express();
const genresRouter = require('./routes/genres')
//middlewares

app.use(express.json());
app.use('/api/genres',genresRouter);


//server 
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})