
const express = require("express");
const path = require("path");
const ejs = require("ejs")
const server = express();

server.set("view engine" , "ejs");

server.get("/test" ,async (req , res)=> {

    const users = [
        {name : "Riteswar", role : "Full Stack Engineer"},
        {name : "Sofiya", role : "FOA"},
        {name : "Simanta", role : "Blockchain Engineer"},
    ]

    res.render("home" , {users})

})

server.listen(4040);