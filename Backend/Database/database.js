const express=require('express');
const app=express();
const sql=require('mysql');
var temp=sql.createConnection(
    {
      host:'sql5.freesqldatabase.com',
      user:'sql5503911',
      password:'5TZETThmmH',
      database:'sql5503911'
    }
    // {
    //   host:'localhost',
    //   user:'root',
    //   password:'',
    //   database:'data for certificate generator'
    // }
);
temp.connect(function(err)
{
    if(err) console.log(err)
    else console.log("connected!!")
});
module.exports=temp;