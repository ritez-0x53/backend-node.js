
// A Stream is a continuous flow of data — like watching a YouTube video while it's still downloading.

// Types of Streams:
// Readable – Read data from a source (e.g., file)
// Writable – Write data to a destination (e.g., file)
// Duplex – Both readable and writable (e.g., TCP socket)
// Transform – Modify data while reading/writing (e.g., compression)

// 🔹 Benefits:
// Memory efficient: Handles large data (like videos or logs) chunk by chunk.
// Non-blocking: Keeps Node.js fast and scalable.

const fsPromise = require("node:fs/promises");
const fs = require("node:fs");
const http = require("node:http");

const server = http.createServer();

async function getFile(path){
    const data = await fsPromise.readFile(path , "utf8");
    return data;
}
server.on("request" , async(req,res)=> {
    if(req.url === "/favicon.ico") {return res.end();}
    const data = await getFile("large.txt"); //not recommended

    const readStream = fs.createReadStream("large.txt"); // recommended.
    
    readStream.on("data" , (chunk)=> res.write(chunk) );

    readStream.on("end" , ()=> res.end())


})

function readStream() {
    const readable = fs.createReadStream("large.txt");

    readable.on("data" , (chunk)=> {
        console.log(chunk.toString());
    })
    
    readable.on("end" , ()=> {
        console.log("all data fetched from file")
    })
}





server.listen(8080);