const mongoose = require('mongoose');
const express = require('express');
const app =  express()
const genres =require('./Routes/genres')
mongoose.connect("mongodb://127.0.0.1:27017/vidly")
        .then( console.log("Connected to vidly database"))
        .catch(err => console.log("Couldn't connect to vidly"));
app.use(express.json());

app.use('/api/genres',genres);



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>
{
    console.log(`Listening to port ${PORT}`);
})


