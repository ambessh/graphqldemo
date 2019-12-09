const mongoose=require('mongoose');

const schema=new mongoose.Schema({
name:String,
genre:String,
authorId:String
});

const book= mongoose.model('Book',schema);

module.exports=book;