const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:String,
    age:Number
});

const author= mongoose.model('Author',schema);

module.exports=author;
