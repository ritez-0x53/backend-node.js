
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer();

server.on("request" , (req,res)=> {
    console.info("request coming with endpoint "+req.url);
    if(req.url === "/favicon.ico"){return res.end()};

    if(req.url === "/video"){
        res.writeHead(200 , {
            "content-type":"video/mp4"
        })
        const stream = fs.createReadStream("data/video.mp4");

        // fs.readFile("data/video.mp4" , (err,data)=> res.end(data) );

        // stream.on("data" , (chunk)=>{
        //     res.write(chunk);
        //     stream.resume();
        //     setTimeout(()=> {stream.pause()},2000)
        // } )
        // stream.on("end" , ()=> {
        //     res.end();
        //     console.log("all data read and sent")
        // })
        // stream.on("resume" , ()=> {
        //     console.log("stream paused...")
        // })

        fs.createReadStream("data/video.mp4").pipe(res);
    }

})

server.listen(8080 , ()=> {
    console.info("server running on 8080 of lh")
});