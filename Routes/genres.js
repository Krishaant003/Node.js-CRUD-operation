const express= require('express');
const router = express.Router();
const {Genre,validategenre} = require('../models/genre')
router.use(express.json());


router.get('/',async (req,res)=>
{
    const genres = await Genre.find().sort('category');
    res.send(genres)
})

router.get('/:id',async (req,res)=>
{
   
   const genre = await Genre.findById(req.params.id);

   if(!genre) return res.status(404).send("No genre available with this Id")
   res.send(genre);
})

router.post('/',async (req,res)=>
{
    const {error} = validategenre(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    let genre = new Genre(
    {
        category: req.body.category
    });
    genre = await genre.save()
    res.send(genre);
})

router.put ('/:id', async (req,res)=>
{
    const {error} =validategenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,
        {   
            category : req.body.category,
            new: true
        })
    
    if(!genre) return res.status(400).send("No genre with this Id");
    res.send(genre);
})

router.delete('/:id', async (req,res)=>
{
    const genre =  await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send("No genre with given Id")
    res.send(genre);
})

module.exports = router;