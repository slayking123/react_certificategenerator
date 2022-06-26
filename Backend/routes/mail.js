const express = require('express');
const app = express.Router();
const multer = require('multer');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "souravsahuwala18296@gmail.com",
        pass: "sandip9002857685",
    },
    tls: {rejectUnauthorized: false}
});

const certificate = multer({
    storage: multer.diskStorage({
        destination: './certificate',
        filename: (req, file, cb) => {
            return cb(null, file.originalname)
        }
    })
});

app.post('/',certificate.single('certificate'), (req, res) => {
    let email = req.body.email;
    let file = req.file
    let cname=req.body.cname;

    let mailOptions = {
        from: "souravsahuwala18296@gmail.com",
        to: email,
        subject: "Your Certificate",
        text: cname,
        attachments: [{ filename: file.originalname, path: "./certificate/"+file.originalname}],
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.send(err);
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    });
});
module.exports=app