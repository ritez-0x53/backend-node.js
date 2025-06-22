
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { pipeline } = require("node:stream");

const server = http.createServer();

server.on("request", async (req, res) => {
    console.info("request coming with endpoint " + req.url);
    if (req.url === "/favicon.ico") { return res.end() };

    if (req.url === "/video") {
        res.writeHead(200, {
            "content-type": "video/mp4"
        })
        const stream = fs.createReadStream("data/video.mp4");
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


        // fs.readFile("data/video.mp4" , (err,data)=> res.end(data) );

        // fs.createReadStream("data/video.mp4").pipe(res);

        // best way for streaming -- production
        pipeline(
            fs.createReadStream(path.join(__dirname, "data/video.mp4")),
            res,
            (err) => {
                if (err) { console.error(err) }
                else {
                    console.log("pipeline success")
                }
            }
        )
    }

})

server.listen(8080, () => {
    console.info("server running on 8080 of lh")
});