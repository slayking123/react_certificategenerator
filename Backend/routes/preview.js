const express = require("express")
const app = express.Router();
const sql = require("../Database/database")

app.get('/:transid', function (req, res) {
    var transid = req.params.transid;
    var q = "SELECT * FROM `transaction` WHERE transid ='" + transid + "'";
    sql.query(q, (err, row, field) => {
        if(!err){
            var final = [];
            var transactionData = JSON.parse(row[0]["certificateData"])
            for (let i = 0; i < transactionData.length; i++) {
                sql.query("SELECT * FROM `certificate` WHERE `studentemail`='" + transactionData[i]["email"] + "' AND `id` = '"+row[0]["certificate_id"]+"'", (err, row, field)=>{
                    if(!err){
                        final.push(row[0]);
                        if(i === transactionData.length-1){
                            res.send(final);
                        }
                    }else{
                        res.send(err)
                    }
                })
            }
        }else{
            res.send(err);
        }
    });
})

module.exports = app;