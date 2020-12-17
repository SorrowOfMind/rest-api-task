const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});

function genJWT(user_id){
    const payload = {user: {id: user_id}};
    const secret = process.env.JWTSECRET;
    return jwt.sign(payload, secret);
}

module.exports = genJWT;