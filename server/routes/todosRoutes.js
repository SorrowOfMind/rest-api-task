const router = require('express').Router();
const verify = require('../middleware/verify');
const db = require('../db/dbconn');

router.post('/add', verify, (req, res) => {
    try {
        const values = [req.user.id, req.body.todo];
        const sql = "INSERT INTO todos (user_id, description) VALUES (?, ?)";
        db.query(sql, values, (err, results) => {
            if (err) throw err;
            else {
                const todoSql = "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC LIMIT 1";
                db.query(todoSql, [req.user.id], (err, results) => {
                    if (err) throw err;
                    res.status(201).json({
                        status: "success",
                        todo: results[0],
                        message: "Todo added!"
                    });
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Server Error"
        });
    }
});

router.get('/get', verify, (req, res) => {
    try {
        const sql = "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at ASC";
        db.query(sql, [req.user.id], (err, results) => {
            if (err) throw err;
            res.status(200).json({
                status: "success",
                todos: results,
                message: "Got todos!"
            });
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Server Error"
        });
    }
});

router.delete('/delete/:todoId', verify, (req, res) => {
    try {
        const {todoId} = req.params;
        const userId = req.user.id;
        const sql = "DELETE FROM todos WHERE todo_id = ? AND user_id = ?";
        db.query(sql, [todoId, userId], (err, results) => {
            if (err) throw err;
            res.status(200).json({
                status: "success",
                message: "Todo deleted!"
            });
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Server Error"
        });
    }
});

router.put('/edit/:todoId', verify, (req, res) => {
    try {
        const {todoId} = req.params;
        const {description} = req.body;
        const userId = req.user.id;
        const sql = "UPDATE todos SET description = ? WHERE todo_id = ? AND user_id = ?";
        db.query(sql, [description, todoId, userId], (err, results) => {
            if (err) throw err;
            res.status(201).json({
                status: "success",
                message: "Todo edited!"
            });
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Server Error"
        });
    }
});

module.exports = router;