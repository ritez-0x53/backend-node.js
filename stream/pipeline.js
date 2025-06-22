
const fs = require('node:fs');
const path = require("node:path");
const zlib = require("node:zlib");
const { Transform, pipeline } = require("node:stream");

function textWritePipe(input , output , transform){
 if(transform) {
  pipeline(
  fs.createReadStream(input),
  transform,
  zlib.createGzip(),
  fs.createWriteStream(output),
  (err)=> {
    if(err) {console.error(err)}
    else {console.log("pipeline succeded")}
  }
 )} else {
  pipeline(
  fs.createReadStream(input),
  transform,
  zlib.createGzip(),
  fs.createWriteStream(output),
   (err)=> {
    if(err) {console.error(err)}
    else {console.log("pipeline succeded")}
  }
 )}
}

function videoWritePipe(input , output){
  pipeline(
    fs.createReadStream(input),
    fs.createWriteStream(output),
    (err) => {
      if(err){console.error(err)}
      else {
        console.log("pipeline succeded.")
      }
    }
  )
}

const upperCase = new Transform({
  transform(chunk , encoding , callback){
    callback(null, chunk.toString().toUpperCase()+"\n");
  }
})

textWritePipe("data/large.txt" , "data/output.txt.gz" , upperCase );

// videoWritePipe("data/video.mp4" , "data/output.mp4");