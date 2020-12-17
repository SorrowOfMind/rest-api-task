const router = require('express').Router();
const validate = require('../middleware/validate');
const verify = require('../middleware/verify');
const bcrypt = require('bcrypt');
const genJWT = require('../utilities/genJWT');
const db = require('../db/dbconn');

router.post('/register', validate, (req, res) => {
    const {email, password, password2} = req.body;
    try {
        const checkEmailSql = "SELECT email FROM users WHERE email = ?";
        db.query(checkEmailSql, [email], async (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                return res.status(401).json({ 
                    status: "failed",
                    message: "That email is already taken."
                });
            } else if (password !== password2) {
                return res.status(401).json({
                    status: "failed",
                    message: "Passwords do not match."
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const encryptedPass = await bcrypt.hash(password, salt);

                const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
                db.query(sql, [email, encryptedPass], (err, results) => {
                    if (err) throw err;
                    else {
                        const id = results.insertId;
                        const token = genJWT(id);
                        res.status(201).json({
                            status: "success",
                            userId: id,
                            message: 'User created',
                            token
                        });
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Server Error"
        });
    }
});

router.post('/login', validate, (req, res) => {
    const {email, password} = req.body;
    try {
        const checkEmailSql = "SELECT * FROM users WHERE email = ?";
        db.query(checkEmailSql, [email], async (err, results) => {
            if (err) throw err;
            if (!results.length) {
                return res.status(401).json({ 
                    status: "failed",
                    message: "Email or password are incorrect."
                });
            } else {
                const userDbPass = results[0].password;
                const isVaildPass = await bcrypt.compare(password, userDbPass);
                if (!isVaildPass){
                    return res.status(401).json({
                        status: "failed",
                        message: "Email or password are incorrect."
                    })
                } else {
                    const id = results[0].user_id;
                    const token = genJWT(id);
                    res.status(200).json({
                        status: "success",
                        userId: id,
                        message: "User logged in.",
                        token
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Server Error"
        });
    }
});

router.post('/verify', verify, (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            userId: req.user.id,
            message: "User verified"
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Server Error"
        });
    }
})

module.exports = router;