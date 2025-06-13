
const http = require("node:http");
const fs = require("node:fs");
const url = require("node:url");

// create a server using http
const server = http.createServer(reqHandler)

// reqHandler function to pass a callback to server..
function reqHandler(req, res) {

    const myUrl = url.parse(req.url, true);
    const log = new Date() + " : " + myUrl.pathname + "\n"
    //  log file appending on every request
    fs.appendFile("log.txt", log, () => {
        switch (myUrl.pathname) {
            
        }

    })


    // handler function close here...
}

// running server...
const port = 8080;
server.listen(port, () => {
    console.log("server running on port " + port);
})
