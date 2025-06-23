
const express = require("express");
const monitor = require("express-status-monitor");
const fs = require("node:fs");
const path = require("node:path");
const { pipeline , Transform } = require("node:stream");
const zlib = require("zlib");

const app = express();

app.use(monitor());

app.get("/download/video", (req, res) => {

    const stream = fs.createReadStream(path.join(__dirname, "data/video.mp4"));

    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        // attachment - forces the download dialog
        // filename="video.mp4": Suggests the name to save the file as
        'Content-Disposition': 'attachment; filename="video.mp4"'
    });

    // Log stream lifecycle
    stream.on('open', () => console.log('🟢 Stream opened'));
    stream.on('data', (chunk) => console.log(`📦 Chunk received (${chunk.length} bytes)`));
    stream.on('end', () => {
        res.end("downloaded...")
        console.log('✅ Stream ended')
    });
    stream.on('close', () => console.log('🔒 Stream closed'));
    stream.on('error', (err) => {
        console.error('❌ Stream error:', err);
        res.status(500).end('Error while streaming');
    });

    pipeline(
        stream,
        res,
        (err) => {
            console.log(err);
        }
    )

})

app.get("/stream/video", (req, res) => {
    res.writeHead(200, {
        "content-type": "video/mp4"
    })

    pipeline(
        fs.createReadStream(path.join(__dirname, "data/video.mp4")),
        res,
        (err) => {
            if (err && err.code === 'ERR_STREAM_PREMATURE_CLOSE') {
                console.warn('⚠️ Client closed the connection early.');
            } else if (err) {
                console.error('❌ Streaming error:', err.message);
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
            } else {
                console.log('✅ Streaming completed');
            }
        }
    )
})

app.get("/download/text", (req, res) => {

    res.writeHead(200, {
        "content-type": "text/plain",
        "content-disposition": "attachment; filename = file.txt.gz "
    })

    const uppercase = new Transform({
        transform(chunk , encoding , callback){
            callback(null , chunk.toString().toUpperCase());
        }
    })

    pipeline(
        fs.createReadStream(path.join(__dirname, "data/large.txt")),
        uppercase,
        zlib.createGzip(),
        res,
        (err) => { if (err) { console.error(err) } }
    )

})

app.get("/stream/image" , (req,res)=> {
    res.writeHead(200 , {
        "content-type" : "image",
    })

    fs.createReadStream("data/img.png").pipe(res)

})

app.get("/download/image" , (req,res)=> {
    res.writeHead(200 , {
        "content-type" : "image",
        "content-disposition" : "attachment"
    })
    fs.createReadStream("data/img.png").pipe(res);
})

app.listen(8080, () => console.log("running on 8080"));
