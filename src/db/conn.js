const mongoose = require('mongoose')

// create databases
mongoose.connect("mongodb://localhost:27017/Bussiness_data").then(()=>{
    console.log("connection sucessfull");
}).catch((err)=>{
    console.log("no connection ", err);
})