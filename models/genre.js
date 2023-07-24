const mongoose = require('mongoose');
const Joi =require("joi");

const genreSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true,
        minlength: 3
    }

});

const Genre = new mongoose.model('Genre',genreSchema)




validategenre = (genre) =>
{
    const schema = Joi.object({
        category: Joi.string().min(3).required()
    });
    return schema.validate(genre)
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validategenre = validategenre;