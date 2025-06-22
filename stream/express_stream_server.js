
const express = require("express");
const monitor = require("express-status-monitor");
const fs = require("node:fs");
const path = require("node:path");
const { pipeline } = require("node:stream");

const app = express();

app.use(monitor());

app.get("/video", (req, res) => {
    res.writeHead(200 , {"content-type":"video/mp4"});
    // fs.readFile("data/video.mp4" , async(err,data)=> {
    //     if (err) {console.log(err)}
    //     else {
    //         res.end(data);
    //     }
    // })
    fs.createReadStream(path.join(__dirname,"data/video.mp4")).pipe(res);
})

app.listen(8080 , ()=> console.log("running on 8080"));
