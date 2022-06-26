const express = require("express")
const app = express.Router();
const sql = require("../Database/database")

app.post('/', function (req, res) {
    var id = req.body.id;
    var password = req.body.password;
    var query = "SELECT * FROM `admin` WHERE id='" + id + "' AND password='" + password + "'";
    sql.query(query, function (err, row, field) {
        if (err) throw (err);
        else {
            if (row.length) {
                res.json({
                    result: true,
                    message: row
                });
            }
            else {
                res.json({
                    result: false,
                    message: 'invalid credentials!!!!!!'
                });
            }
        }
    });
});
module.exports = app;
