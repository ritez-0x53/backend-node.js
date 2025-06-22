
const fs = require("fs");
const path = require("path");
const zlib = require('zlib');
const { Transform } = require("stream");


const inputPath = path.join(__dirname , "/data/large.csv");
const outputPath = path.join(__dirname , "/data/output.csv");
const readable = fs.createReadStream(inputPath);
const writable = fs.createWriteStream(outputPath);

readable.on("data" , (chunk)=> {
    // writable.write(chunk);
    // writable.write("\n");
})

// using pipe 
// readable.pipe(writable);

// using transform in between suing pipe - Custom Transform Streams
const upperCase = new Transform({
    transform(chunk , encoding , cb){
        cb(null , chunk.toString().toUpperCase());        
    }
})
readable.pipe(upperCase).pipe(writable);


fs.createReadStream(inputPath)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('data.txt.gz'));


readable.on("end" , ()=> {
    // writable.end()
    console.log("done everything");
})