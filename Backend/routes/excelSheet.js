const express = require("express")
const app = express.Router();
const sql = require("../Database/database")
const xl = require('xlsx');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: "./excelsheet",
    filename: (function (req, res, cv) {
        return cv(null, res.originalname)
    })
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50
    }
})
app.post('/upload', upload.single('worksheet'), function (req, res) {
    res.json({
        success: true,
        url: req.file.path
    })
});

function checkDuplicate(id, data) {
    return new Promise((resolve, reject) => {
        sql.query("SELECT `id` FROM `certificate` WHERE `studentemail` LIKE '" + data["email"] + "'", (err, row, field) => {
            if (!err) {
                if (row.length === 0) {
                    resolve({ upload: true });
                }
                row.forEach(element => {
                    if (element.id === id) {
                        resolve({ upload: false });
                    } else {
                        resolve({ upload: true });
                    }
                });
            }
            else reject(err);
        });
    })
}

function uploadData(id, name, data, transid) {
    let duplicateData = []
    return new Promise((resolve, reject) => {
        for (let i = 0; i < data.length; i++) {
            checkDuplicate(id, data[i]).then(res => {
                if (res.upload) {
                    sql.query("INSERT INTO `certificate` (id,certificatename,studentemail,studentname,branch) VALUES ('" + id + "', '" + name + "', '" + data[i]["email"] + "', '" + data[i]["name"] + "','" + data[i]["branch"] + "')", (err, row, field) => {
                        if (!err) {
                        }
                        else res.json(err);
                    });
                } else {
                    duplicateData.push(data[i]);
                }
                if (i === data.length - 1) {
                    resolve({
                        NumberOfDuplicateData: duplicateData.length,
                        duplicateData: duplicateData,
                        transid: transid
                    })
                }
            })
        }
    })
}

function createTransaction(id, data) {
    let tempTransID = Date.now();
    return new Promise((resolve, reject) => {
        let transSQL = "INSERT INTO `transaction` (transid, certificate_id, certificateData) VALUES ('" + tempTransID + "', '" + id + "', '" + JSON.stringify(data) + "')";
        sql.query("SELECT * FROM `transaction` WHERE `certificate_id` = '" + id + "'", (err, row, field) => {
            if (!err) {
                for (let i = 0; i < row.length; i++) {
                    if (JSON.stringify(data) === row[i]["certificateData"]) {
                        resolve(row[i]["transid"]);
                    } else if (JSON.stringify(data) !== row[i]["certificateData"] && i === row.length - 1) {
                        sql.query(transSQL, (err, row, field) => {
                            if (!err) {
                                resolve(tempTransID)
                            } else {
                                resolve(err);
                            }
                        })
                    }
                }
                if(row.length === 0){
                    sql.query(transSQL, (err, row, field) => {
                        if (!err) {
                            resolve(tempTransID)
                        } else {
                            resolve(err);
                        }
                    })
                }
            } else {
                resolve(err)
            }
        })
    })
}

app.post('/', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var worksheetname = req.body.worksheetname;
    var excelsheet = req.body.excelsheet;

    var ptr = xl.readFile('./excelsheet/' + excelsheet);
    var worksheet = ptr.Sheets[worksheetname];
    var data = [];
    var headers = {};
    for (z in worksheet) {
        if (z[0] === "!") continue;
        var col = z.substring(0, 1);
        var row = parseInt(z.substring(1));
        var value = worksheet[z].v;
        if (row == 1) {
            headers[col] = value;
            continue;
        }
        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;
    }
    data.shift();
    data.shift();
    createTransaction(id, data).then(transid => uploadData(id, name, data, transid).then(final => res.send(final)));
})

module.exports = app;