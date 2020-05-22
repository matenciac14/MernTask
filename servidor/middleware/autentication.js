const jwt = require ('jsonwebtoken');

module.exports = function (req, res, next){
    //read token
    const token = req.header('x-auth-token');

    //console.log(token);

    //review the token
    if(!token){
        return res.status(401).json({msg: 'denied permission, the token does exist'})
    }

    // validate token
    try {
        const jwtVerified = jwt.verify(token, process.env.SECRET);
        req.user = jwtVerified.user ;
        next();
    } catch (error) {
        res.status(401).json({msg: 'invalid token'})
    }
}