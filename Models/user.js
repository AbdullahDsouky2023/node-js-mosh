const Joi = require("joi");
const mongoose = require("mongoose");
const jwt  = require('jsonwebtoken')
const config = require('../config.js');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required:true
  },
  name: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.methods.getAuthenticationToken=function()
{
  const token = jwt.sign({id:this.id},config.jwtSecret)
  return (token);
}
const User = mongoose.model("users", userSchema);

function  validateUser(user)
{
    const schema = Joi.object({
        email:Joi.string().min(5).required().email(),
        name:Joi.string().min(5).required(),
        password:Joi.string().min(4).required(),
    })

    return schema.validate(user)
}

exports.User = User;
// exports.validate = validateUser
