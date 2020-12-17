const jwt = require('jsonwebtoken');
require("dotenv").config({path: '../.env'});

module.exports = (req, res, next) => {
    const token = req.header("token");
    
    if (!token) return res.status(403).json({
        status: "failure", 
        message: "You are not authorized."
    });

    try {
        const secret = process.env.JWTSECRET;
        const verified = jwt.verify(token, secret);
        req.user = verified.user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "failure",
            message: "Token is not valid"
        });
    };

 
    

}