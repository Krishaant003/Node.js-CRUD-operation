
const express = require('express');
const app =  express()
const genres =require('./Routes/genres')
app.use(express.json());

app.use('/api/genres',genres);



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>
{
    console.log(`Listening to port ${PORT}`);
})


