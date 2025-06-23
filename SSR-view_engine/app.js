
const express = require("express");
const path = require("path");
const ejs = require("ejs")
const server = express();

server.set("view engine", "ejs");

server.get("/", async (req, res) => {
    res.render("home")
})

server.get("/profile", async (req, res) => {
    res.render("profile")
})

server.get("/contact", async (req, res) => {

    res.render("contact")
})

server.get("/users", async (req, res) => {

    const users = [
        { name: "Riteswar", role: "Full Stack Engineer" },
        {name : "Sofiya" , role : "FOA"},
        {name : "Chai" , role : "Java Programmer"},
        {name : "Lisa" , role : "Network Admin"},
        {name : "John" , role : "AI Engineer"}
    ]
    res.render("users", { users })
})


server.listen(4040);