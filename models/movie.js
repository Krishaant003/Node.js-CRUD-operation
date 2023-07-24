const mongoose = require('mongoose');
const joi = require('joi');
const Joi = require('joi');
const{genreSchema} = require('./genre')

const movieSchema = new mongoose.Schema(
    {
        "title":
        {
            type: String,
            required:true
        },
        "genre":
        {
            type:genreSchema,
            required:true
        },
        "numberInstock":Number,
        "dailyRentalRate":Number
    })

const Movie = mongoose.model('Movies',movieSchema);    

function validateMovie(movie)
{
    const schema = joi.object({
        "title":Joi.string().required(),
        "genreID":Joi.string().required(),
        "numberInstock":Joi.number(),
        "dailyRentalRate":joi.number()
    })
    return schema.validate(movie);
}


exports.validateMovie = validateMovie;
exports.Movie = Movie;