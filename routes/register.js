const { User } = require("../Models/user.js");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require('../middlewares/auth.js')
router.get('/me',auth,async(req,res)=>{
  try {
    const user = await User.findById(req.user._id).select("-password")
  res.send(user)
  }catch(err)
  {
    res.send(err).status(400)
  }
})
router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.send("this email is already used try another one or login");

    const newUser = new User(_.pick(req.body, ["email", "name", "password","isAdmin"]));
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    const token = newUser.getAuthenticationToken();
    res.header("x-auth", token).send(_.pick(newUser, ["email", "name"]));
  } catch (err) {
    res.send(err.message).status(500);
  }
});
function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    name: Joi.string().min(5).required(),
    password: Joi.string().min(4).required(),
    isAdmin:Joi.boolean()
  });

  return schema.validate(user);
}
module.exports = router;
