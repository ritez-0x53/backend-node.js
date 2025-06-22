
const fs = require("node:fs");
const path = require("node:path");

// open → ready → readable → data → end → close
// open: File descriptor is opened
// ready: Internally ready to be read (some buffer may be loaded)
// readable: Can now .read() manually
// data: Emitted automatically in flowing mode
// end: Reached EOF
// close: File descriptor closed

// | Event       | Description                  | Common Usage                     |
// | ----------- | ---------------------------- | -------------------------------- |
// | `data`      | When chunk is received       | Process chunks in real-time      |
// | `readable`  | Data is ready to `.read()`   | Manual reading control           |
// | `end`       | All data has been read       | Final logic or cleanup           |
// | `close`     | Stream and file fully closed | Release memory/resources         |
// | `error`     | Something went wrong         | Avoid crashes                    |
// | `.pause()`  | Temporarily stop flow        | Throttle or wait before resuming |
// | `.resume()` | Resume paused flow           | Continue reading                 |


const filePath = path.join(__dirname , "/data/large.txt");
const readStream = fs.createReadStream(filePath);

readStream.on("data" , (chunk)=> {
    console.log("chunk data --> ",chunk);
    // pause chunk read after one chunk read
    readStream.pause();
    setTimeout(()=> { readStream.resume()} , 200);
    // resume chunk read after 200ms.
})

readStream.on("pause" , ()=> {
    console.log("stream paused -> chunk read paused...")
})
readStream.on("resume" , ()=> {
    console.log("stream resumed -> chunk read resumed...")
})

readStream.on("end" , ()=> {
    console.log("all chunk read")
})

readStream.on("close" , ()=> {
    console.log("stream closed...")
})

readStream.on("error" , (err)=> {
    console.log("something went wrong -> "+err);
})
