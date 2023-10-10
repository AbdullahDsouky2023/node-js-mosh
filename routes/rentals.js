const express = require('express')
const router = express.Router()
const Rental = require('../Models/rentals')
const Joi = require('joi')
//Get

router.get('/',async(req,res)=>{
    try {
        const rentals = await Rental.find().populate("customer","name").populate("movie","title genre")
        res.send(rentals)
    }catch(err)
    {
        res.send(err.message).status(404)
    }
})
router.get('/:id',async(req,res)=>{
    try {
        const rental = await Rental.findById(req.params.id)
        if(!rental) res.send("rental is not found")
        res.send(rental)
    }catch(err)
    {
        res.send(err.message).status(404)
    }
})
router.post('/',async(req,res)=>{
    try {
        const {err} = validateRental(req.body)
        if(err) res.send(err.details[0].message)
        const rental = new Rental({
            customer : req.body.customerId,
            movie:req.body.movieId,
            rentalDate:req.body.rentalDate,
            returnDate:req.body.returnDate,
    
        })
        const result = await rental.save()
        res.send(result)
    }catch(err)
    {
        res.send(`can not add rentals ${err.message}`).status(404)
    }
})

function validateRental(rental){
    const schema = Joi.object({
        customerId:Joi.string().required(),
        movieId:Joi.string().required(),
        rentalDate:Joi.date(),
        returnDate:Joi.date(),
        
    })
    return schema.validate(rental)
}

module.exports = router