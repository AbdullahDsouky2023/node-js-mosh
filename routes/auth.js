const { User } = require("../Models/user.js");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.send("Invalid email or password");
    const token = user.getAuthenticationToken()//information expert principle

    res.send(token)
  } catch (err) {
    res.send(err.message).status(500);
  }
});
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(req);
}
module.exports = router;
