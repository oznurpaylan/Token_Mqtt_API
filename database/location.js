var mongoose = require('mongoose');

var locationSchema= new mongoose.Schema({
    ip:{type:String},
    city:{type:String, require:true},
    latitude:{type:String, require:true},
    longitude:{type:String, require:true},
    date:{type:String}
});

var location=mongoose.model('location',locationSchema);
module.exports.loc=location;
