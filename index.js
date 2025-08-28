require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {userRouter} = require('./routes/user');
const {blogRouter} = require('./routes/blog');

app.use("/api/v1/user",userRouter);
app.use("/api/v1/blog",blogRouter);

async function main(){
    // mongoose connection
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
    app.listen(3000,()=>{
        console.log("server is up and running")
    });
}

main();