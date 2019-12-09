const express=require('express');
const graphqlHTTP=require('express-graphql');
const app=express();
const mongoose=require('mongoose');
const schema=require('./schema/schema');
const cors=require('cors');

app.use(cors());

app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}));

mongoose.connect('mongodb://localhost/graphqldemo',{useCreateIndex:false,useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    console.log('connected to the database');
})
.catch(err=>{
    console.log(err);
});


app.listen(4000,()=>{
    console.log('listening to requests on port number 4000');
})