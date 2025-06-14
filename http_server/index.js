
const http = require("node:http");
const fs = require("node:fs");
const url = require("node:url");


const simpleHandler = require("./request_handler/simpleHandler");
const queryHandler = require("./request_handler/urlHandling");


// create a server using http
const server = http.createServer(queryHandler);

// Don't forget to start the server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
