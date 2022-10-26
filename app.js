var http=require('http')
var fs =require('fs')
const express = require('express');
const mongoose = require('mongoose');
const authRoute=require('./routes/authRoutes');
var db=require('./database/db');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
const app = express();




//form elamanlarını pars etmesi için bodyParser
app.use(bodyParser.urlencoded({extended:true}));
//json objesi için bodyParser
app.use(bodyParser.json());

//lokasyon datası için oluşturulan schema kntrol

var location=require('./database/location')
// const dt=new Date();
// var newLocation=new location({
//     ip:'88.249.183.17',
//     city:'İzmir',
//     latitude:'39.95971',
//     longitude:'32.86969',
//     date:dt.Date(),
// });
// newLocation.save(function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('Lokasyon bilgisi alındı');
//     }
//     console.log(newLocation)

// }); 


app.use('/',authRoute);
app.use(express.json());

// middleware
app.use(express.static(__dirname + '/views'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.set('views','./views'); //ejs dosya yolu

// app get('*' , checkUser); //checkUSer ara katmanını kullanmak istiyor her checkUser get ya da post isetğine uygular
app.get('/index', requireAuth,(req,res)=>res.render('index')); //ulaşabilmek için kimlik doğrulama gerekli requireAuth

app.listen(3000);

//cookies
// app.get('/set-cookies',(req,res)=>{
//     //res.setHeader('Set-Cookie','newUser=true');
//     res.cookie('newUser',false);
//     res.cookie('isEmployee',true, {httpOnly:true}); //max-age kullanılmazsa tarayıcı kapanana kadar  oturum açık kalır
//     res.send('Çerezler alındı...');

// });

// app.get('/read-cookies',(req,res)=>{
//     const cookies=req.cookies;
//     console.log(cookies);  
//     res.json(cookies);

// });

