const express = require("express");

const app = express();

app.use("/helo",(req,res)=>{
    res.send("hello feom server")
})

app.listen(3000, ()=>{
    console.log("successful")
});