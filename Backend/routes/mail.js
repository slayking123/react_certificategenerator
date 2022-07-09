const express = require('express');
const app = express.Router();
const multer = require('multer');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "fakebgmi.94@gmail.com",
        pass: "lxbivwgutziduntv",
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
        from: "fakebgmi.94@gmail.com",
        to: email,
        subject: "Your Certificate",
        text: cname,
        attachments: [{ filename: file.originalname, path: "./certificate/"+file.originalname}],
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
module.exports=app