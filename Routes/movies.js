const { Genre } = require('../models/genre');
const {Movie,validateMovie} = require('../models/movie');
const express = require('express');
const router = express.Router()
router.use(express.json());

router.get('/',async (req,res)=>{

    const movies = await Movie.find();
    res.send(movies);
})

router.get('/:id',async (req,res)=>
{
    try
    {const movie =  await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send(error.details[0].message);
    res.send(movie);}
    catch(err)
    {
        console.log(err.message);
    }
})

router.post('/', async (req,res)=>
{
    const {error} =validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    

    try
    {
        const genre = await Genre.findById(req.body.genreID);
        if(!genre) return res.status(400).send("Invalid genre")

        let movie = new Movie({
            title:req.body.title,
            genre:
            {
                _id:genre._id,
                category:genre.category
            },
            numberInstock:req.body.numberInstock,
            dailyRentalRate:req.body.dailyRentalRate
        })
        movie = await movie.save();
        res.send(movie);
    }
    catch(err)
    {
        console.log(err.message);
    }
})

router.put('/:id',async (req,res)=>
{
    try
    {
        let movie = await Movie.findById(req.params.id);
        movie.title = req.body.title,
        movie.numberInstock =req.body.numberInstock;
        movie = await movie.save();
        res.send(movie);
    }
    catch(err)
    {
        console.log(err.message)
    }
})

router.delete('/:id',async (req,res)=>
{
    try
    {
        const movie = await Movie.findByIdAndRemove(req.params.id);
        if(!movie) return res.status(404).send("No movie with given Id");
        res.send(movie)

    }
    catch(err)
    {
        console.log(err.message);
    }
})



module.exports = router;