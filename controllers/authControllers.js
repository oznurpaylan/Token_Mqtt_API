const { error, Console } = require('console');
const path=require('path');
const User= require('../database/user');
const jwt=require('jsonwebtoken')
const{loc}=require('../database/location'); //location verilerimi inport etmek için

const handleErrors = (err)=>{
    console.log(err.message, err.code);
    let errors = { email:'', password:''};

    if(err.code === 11000){
        errors.email='email zaten kayıtlı';
        return errors;
    }

    if (err.message === 'incorrect email') {  //user module static.login
        errors.email = 'email kayıtlı değil';
    }

    if (err.message === 'incorrect password') {
        errors.password = 'yanlış şifre';
    }

    //validation err
    if(err.message.includes("kullanıcı aluşturulamadı")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message; //preview properties
        });
    }
    return errors;
}

// create token
const maxAge = 3 * 24 * 60 * 60; //3 günlük saniye cinsinden değer
const createToken = (id) => { 
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  });
};

module.exports.loginGet=function(req,res){
    res.render('login');
}

module.exports.signupGet=function(req,res){
    res.render('signup');
}

module.exports.logoutGet=(req,res)=>{
    res.cookie('jwt', '',{maxAge:1});
    res.redirect('/');
    console.log('çıkış için yönlendiriliyor...')

}

//index.ejs den gelen formda satasearch için olan veriyi arama
module.exports.dataPost=(req,res)=>{
    const inData=req.body.dataSearch;
    console.log(inData); 
    loc.find({ip: inData},(err,data)=>{
        if(err){
            console.log(err);            
        }
        else{
            res.json(data);
            console.log(data);
        }
    });
}


module.exports.loginPost = async (req,res)=>{
    const{ email , password }=req.body;
    try{
        const user=await User.login( email,password); 
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly:true, maxAge: maxAge * 1000 }); 
        res.status(200).json({user: user._id}); //son kullanıcı idsini json olarak geri dödür

    }
    catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors});
    }
    //---
    console.log('Kullanıcı girişi sağlandı');
}

module.exports.signupPost= async (req,res)=>{
    const{ email , password }=req.body;
    try{
        const user=await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user: user._id});
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({errors});

    }
}

//const location=require('../database/location');

//postman ile lokasyon oluşturma kısmı 
//lokasyon şemasına göre oluşturuyor.
const { Mongoose, mongo } = require('mongoose');
const date=new Date();
const ip= '11.111.111.11';  //ip elle giriliyor :(

module.exports.locationPost= async(req,res)=>{
    const{city,latitude,longitude}=req.body;
    try{
        const user= await loc.create({ip,city,latitude,longitude,date});
        res.status(201).json({user:user._id});
    }
    catch(err){
        console.log(err);
    }

}