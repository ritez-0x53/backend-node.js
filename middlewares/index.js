
const express = require("express")
const fs = require("fs");
const path = require("path");
const app = express();

// builtin middleware
app.use(express.json()) // parses json body
app.use(express.urlencoded({extended: false})) //parses form data

// A middleware that logs every request - application level
app.use((req,res,next)=> {
    const date = new Date().toLocaleString()
    const log = `\n${date} : ${req.url} ${req.method}`
    fs.appendFile(path.join("log.txt") , log , (err)=> {
        if(!err) {console.log("log added...")} 
        next();
    });
})

app.get("/" , (req,res)=> {
    res.send("<h1>Home Page</h1>")
})
app.get("/profile" , (req,res)=> {
    res.send("<h1>Profile </h1>")
})
app.get("/error" , (req,res)=> {
      throw new Error('Something went wrong!');

})

// ✅ 404 Not Found (Catch-All)
app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

// ✅ Error-handling middleware (Must be at the end)
app.use((err, req, res, next) => {
  console.error('❌', err.stack);
  res.status(500).send(`<h1>Internal Server Error : ${err.message}</h1>`)
});

app.listen(8080 , ()=> {console.log("server running on 8080 port")})