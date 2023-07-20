const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3
    },
    phone:{
        type: Number,
        required: true,
    }
});

const Customer = new mongoose.model('Customer',customerSchema);

validateCustomer = customer =>
{
    const schema = Joi.object({
        name : Joi.string().min(3).required(),
        phone: Joi.number().required()
    })

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;