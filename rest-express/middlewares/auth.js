function authenticator(req,res,next)
{
    console.log('auth ..........');
    next()
}
module.exports = authenticator