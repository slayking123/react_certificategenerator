/***********************************************MODULE**************************************************/
const express = require("express");
const app = express();
/***********************************************MODULE**************************************************/

/***********************************************MIDDLEWARE**************************************************/
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
/***********************************************MIDDLEWARE**************************************************/

/***********************************************ROUTES**************************************************/
const adminRoute= require('./routes/admin');
const tempRoute= require('./routes/template');
const excelRoute= require('./routes/excelSheet');
const previewRoute= require('./routes/preview');
const mailRoute= require('./routes/mail');
const studentRoute= require('./routes/student');
const authRoute= require('./routes/auth');

app.use('/admin',adminRoute);
app.use('/template',tempRoute);
app.use('/excel',excelRoute);
app.use('/preview',previewRoute);
app.use('/mail',mailRoute);
app.use('/student',studentRoute);
app.use('/auth',authRoute);
/***********************************************ROUTES**************************************************/

/***********************************************PORT**************************************************/
app.listen(process.env.PORT || 4000);
/***********************************************PORT**************************************************/
