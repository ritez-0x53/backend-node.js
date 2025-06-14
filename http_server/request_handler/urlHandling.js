
const url = require("node:url")

function queryHandler(req,res) {

    const URL = url.parse(req.url, true);
    // console.log(URL);
    console.log(URL.pathname);

    switch (URL.pathname) {
        case "/":
            res.writeHead(200, {
                "content-type": "text/plain"
            })
            res.write("HOME PAGE")
            res.end()
            break;

        case "/search":
            res.writeHead(200, {
                "content-type": "text/plain",
            })
            const query = URL.query;
            res.end("Result of " + query.q)
            break;

        case "/user":
            if(URL.query.name && URL.query.id) {
                res.end(`username is ${URL.query.name} and id is ${URL.query.id}`);
            }else if(URL.query.name) {
                res.end("username is "+URL.query.name);
            }
            else if(URL.query.id) {
                res.end("id is "+URL.query.id);
            } else {
                res.end("no user and id")
            }
            break;

        default:
            res.writeHead(404);
            res.end("Not Found-" + res.statusCode);
    }
} 

module.exports = queryHandler;