
// Streams and Buffers in nodejs

const http = require("node:http");

const server = http.createServer((req,res)=> {
    if(req.url === "/favicon.ico"){
        return res.end();
    }
    // 

    console.log("request incoming "+req.url)
    res.writeHead(200 , {"content-type":"text/plain"})
    res.write("Hello this is a simple server...")
    res.end();



})



server.listen(2020 , ()=> {
    console.log("server running on port 2020");
})