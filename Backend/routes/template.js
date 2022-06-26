const express = require("express")
const app = express.Router();
const sql = require("../Database/database")

app.get('/:collageID', function (req, res) {
    var collageID = req.params.collageID;
    var query = "SELECT * FROM `certificatestemplate` WHERE `CollageID` = '" + collageID + "'";
    sql.query(query, function (err, row, field) {
        if (err) throw (err);
        else {
            res.send(row);
        }
    });
});
module.exports = app;