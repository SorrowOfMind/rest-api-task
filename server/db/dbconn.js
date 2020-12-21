const mysql = require('mysql');

let dbConn = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})


module.exports = dbConn;

