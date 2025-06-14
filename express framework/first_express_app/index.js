const express = require("express");

const app = express();

app.get("/" , (req,res)=> {
    console.log(req.method);
    res.send("HOME PAGE.")
})

app.get("/about" , (req,res)=> {
    console.log(req.url , req.method)
    if(req.query.name) {
        res.send(`ABOUT - ${req.query.name}`);
    } else {
        res.send("ABOUT")
    }
})

app.listen(8080 , ()=> {
    console.log("server running on 8080");
})
