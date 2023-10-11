const express = require('express')
const router = express.Router();
const Joi =require('joi')
const Customer= require('../Models/Customer')
const auth = require('../middlewares/auth')
//route handler
router.get('/',async(req,res)=>{
    try {
        const customers= await Customer.find()
        res.send(customers);
    }catch(err)
    {
        console.log(err)
    }
})
router.get('/:id',async(req,res)=>{
    try {

        const customerId = req.params.id
        const customer = await Customer.findById(customerId)
        if(!customer)
        {
            return res.send('Customer is not found')
        }
        res.send(customer);
    }catch(err)
    {
        console.log(err)
    }
})
router.post('/',auth,async(req,res)=>{
try {

    const {error} = validateCustomer(req.body);
    if(error) return res.send(error.details[0].message)
    
    const customer= new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    })
    const result = await customer.save()
    res.send(result);
}catch(err)
{
    console.log(err)
}
})
router.put('/:id',auth,async(req,res)=>{
    try {

        const customerID = req.params.id
        const customer = await Customer.findById(customerID)
        if(!customer) return res.send('Customer is not found')
        
        const {error} = validateCustomer(req.body);
        if(error)
        {
            return res.send(error.details[0].message)
        }
        
   
        customer.name = req.body.name
        customer.phone = req.body.phone
        customer.isGold = req.body.isGold
        const result = await customer.save()
        res.send(result);
    }catch(err)
    {
        console.log(err)
    }
})
router.delete('/:id',auth,async(req,res)=>{
    try {

        const customerId = req.params.id
        const customer = await  Customer.deleteOne( {_id :customerId})
        if(!customer) return res.send('Customer is not found')
        res.send(customer);
    }catch(err)
    {
        console.log(err)
    }
})

//functions
function validateCustomer(customer){
    const schema=Joi.object({
        name:Joi.string().min(5).required(),
        phone:Joi.number().min(10).required(),
        isGold:Joi.boolean().required()
    })
    return schema.validate(customer)
}
//server 
module.exports = router