const mysql = require('mysql');

const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
};

let dbConn;

function handleDisconnect(){
    dbConn = mysql.createConnection(dbConfig);

    dbConn.connect((err) => {
        if (err) {
            console.log('Error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    dbConn.on('error', err => {
        console.log('db error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') handleDisconnect();
        else throw err;
    })
}

handleDisconnect();

module.exports = dbConn;

