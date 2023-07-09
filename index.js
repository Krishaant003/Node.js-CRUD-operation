const Joi = require('joi')
const express = require('express');
const app =  express()

app.use(express.json())

const Genres = [
    {id : 1 , category: "Action"},
    {id : 2 , category: "Romance"},
    {id : 3 , category: "Anime"},
    {id : 4 , category: "Thriller"},
    {id : 5 , category: "Horror"}
]


validategenre = (genre) =>
{
    const schema = Joi.object({
        category: Joi.string().min(3).required()
    });
    return schema.validate(genre)
}

find = (index) =>
{
   return Genres.find(c => c.id === parseInt(index))
}
 
app.get('/api/genres',(req,res)=>
{
    res.send(Genres)
})

app.get('/api/genres/:id',(req,res)=>
{
   
   const genre = find(req.params.id)

   if(!genre) return res.status(404).send("No genre available with this Id")
   res.send(genre);
})

app.post('/api/genres',(req,res)=>
{
    const {error} = validategenre(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    const genre =
    {id:Genres.length +1,
     category: req.body.category
    }
    Genres.push(genre)
    res.send(genre);
})

app.put('/api/genres/:id',(req,res)=>
{
    const genre = find(req.params.id)
    if(!genre) return res.status(400).send("No genre with this Id");

    const {error} =validategenre(req.body);
   if(error) return res.status(400).send(error.details[0].message);

    genre.category = req.body.category;
    res.send(genre);
})

app.delete('/api/genres/:id',(req,res)=>
{
    const genre = Genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) res.status(404).send("No genre with given Id")
    const index = Genres.indexOf(genre);
    Genres.splice(index,1);
    res.send(genre);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>
{
    console.log(`Listening to port ${PORT}`);
})


