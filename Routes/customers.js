const express = require('express');
const router = express.Router();
const {Customer,validateCustomer} =require('../models/customers')
router.use(express.json());

router.get('/', async (req ,res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.get('/:id', async (req,res) =>
{
    try {
    const customer = await Customer.findById(req.params.id);
    if( !customer ) return res.status(404).send("No customer with given id");
    res.send(customer);}
    catch (err){
    console.log(err.message)}
})

router.post('/' , async (req ,res) =>
{
    const {error} = validateCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    try {
    let customer = new Customer({
        name : req.body.name,
        phone: req.body.phone
    })
    customer = await customer.save();
    res.send(customer);}
    catch(err)
    {
        console.log(err.message);
    }
})
router.put('/:id', async(req ,res) =>
{
    const {error} = validateCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);


    try{
    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        phone: req.body.phone,
        new : true
    })
    res.send(customer);}
    catch(err)
    {
        console.log(err.message);
    }
})

router.delete('/:id',async (req,res)=>
{
    const customer =  await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send("No customer with given id");
    res.send(customer);
})

module.exports = router;