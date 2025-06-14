
function formHandler(req, res) {

    switch (req.url) {
        case "/":
            fs.readFile(`${__dirname}/pages/home.html`, "utf8", (err, data) => {
                if (err) { throw err }
                else {
                    res.end(data);
                }
            })
            break;
        case "/form":
            if (req.method === "GET") {
                fs.readFile(`${__dirname}/pages/form.html`, "utf8", (err, data) => {
                    if (err) { throw err }
                    else {
                        res.end(data);
                    }
                })
            } else if (req.method === "POST") {
                let body = ""
                req.on("data", (data) => {
                    body += data;
                })
                req.on("end", () => {
                    const myBody = queryString.parse(body);
                    const { username, num1, num2 } = myBody;
                    res.writeHead(200, {
                        "content-type": "text/html"
                    })
                    res.write(`<h1>Username is ${username}</h1>`)
                    res.write(`<h1>Sum of Two num is ${Number(num1) + Number(num2)}</h1>`)

                    res.write(`<a href="/form">Go to form</a>`)
                    res.end();
                })
            }
            break;

        default: res.writeHead(404, {
            "content-type": "text/html"
        })
            res.end("<h1>Page Not Found</h1>")
    }

}