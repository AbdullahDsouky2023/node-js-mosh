function admin(req,res,next)
{
    console.log(req.user)
    if(!req.user.isAdmin) return res.status(403).send("forbidden")
    next()

}
module.exports = admin