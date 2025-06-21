

// 🚰 What Are Streams in Node.js?
// A stream is a way to handle reading or writing data piece by piece, instead of all at once.

// ✅ Why Use Streams?
// Handle large data (files, video, JSON)
// Avoid memory overload
// Efficient, non-blocking I/O
// Enables real-time processing

// 📦 Four Types of Streams
// Stream Type         	      Description	                 Example
// Readable          	Can read data from it	        File input, HTTP request body
// Writable	            Can write data to it            File output, HTTP response
// Duplex	            Both readable and writable	    TCP socket
// Transform	        Modify data while streaming	    Gzip compression, encryption

const fs = require("fs");

const readable = fs.createReadStream("large.txt");

readable.on("data" , (chunk)=> {
    console.log(chunk);
})

// readable.once("data" , (chunk)=> {
//     console.log(chunk.toString());
// })

readable.on("end" , ()=> {
    console.log("file reading done...")
})

readable.on("error" , (err)=> {
    console.error(err)
})