
function simpleHandler (req, res) {
    if (req.url === "/favicon.ico") {
        res.writeHead(204);
        return res.end();
    }

    console.log("Request Coming.");
    console.log(req.url);
    console.log(req.method);
    // console.log(req.headers);

    if (req.url === "/" && req.method === "GET") {
        res.write("Home Page");
        res.end();
    } else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, {
            "content-type": "text/plain"
        });
        res.end(`About Page - ${res.statusCode} `);
    } else {
        res.writeHead(404, {
            "content-type": "text/plain"
        });
        // console.log(res);
        res.end("Page Not Found - "+res.statusCode);
    }
}

module.exports = simpleHandler;