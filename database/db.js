var mongoose = require('mongoose');
mongoose.Promise=require('bluebird');
var mongoDB='mongodb://localhost:27017/apiDB';
mongoose.connect(mongoDB,function(err){
    if(err){
        console.log('mongoDB bağlantı hatası... ' + err);
    }
    else{
        console.log('mongoBD bağlandı... '+mongoDB);
    }

});

