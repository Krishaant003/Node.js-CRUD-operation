
const express = require('express');
const app =  express()

const Genres = [
    {id : 1 , category: "Action"},
    {id : 2 , category: "Romance"},
    {id : 3 , category: "Anime"},
    {id : 4 , category: "Thriller"},
    {id : 5 , category: "Horror"}
]


app.get('/api/genres',(req,res)=>
{
    res.send(Genres)
})

app.get('/api/genres/:id',(req,res)=>
{
   const genre = Genres.find(c => c.id === parseInt(req.params.id))
   if(!genre) return res.status(404).send("No genre available with this Id")
   res.send(genre);
})



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>
{
    console.log("Listening to port 3000");
})