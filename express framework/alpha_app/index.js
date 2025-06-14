
const express = require("express");
const users = require("./users.json");
const fs = require("node:fs");
// REST API - JSON
// GET /users - HTML doc. render

// (dynamic path parameters)
// GET /api/users/:id  -- get user of id = :id;

// express server.
const app = express();
/*
2xx → Success    | 200 (OK), 201 (Created), 204 (No Content)
4xx → Client     | 400 (Bad Request), 401 (Unauthorized), 404 (Not Found)
5xx → Server     | 500 (Internal Error), 503 (Unavailable)
*/

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.static("public")); // Serve static files
app.use(express.urlencoded({ extended: false }));

// Runs on ALL requests
app.use((req, res, next) => {
    console.log("Request received at:", new Date().toLocaleString());
    next();
});


// Runs only on `/api` routes
app.use("/api", (req, res, next) => {
    console.log("API request");
    next();
});


// GET /api/users - json data
app.get("/api/users", (req, res) => {
    res.status(200).json(users);
})


app.post("/api/users", (req, res) => {
    const body = req.body;

    if (!req.body) {
        return res.status(400).end()
    }

    users.push({ id: users.length + 1, ...body })
    fs.writeFile(__dirname + "/users.json", JSON.stringify(users), () => {
        res.status(201).json(users[users.length - 1]);
    })
})

// // GET /users - list users in html
// app.get("/users", (req, res) => {
//     let html = `
//     <ol>
//     ${users.map(user => `<li>${user.first_name}</li>`).join(" ")}
//     </ol>
//     `
//     res.send(html);
// })

app.route("/api/users/:id")
    .get((req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        if (!user) {
            return res.status(404).end()
        }
        res.status(200).json(user);
    })
    .patch((req, res) => {
        const id = req.params.id;
        const copyUsers = [...users];

        const user = users.find(user => user.id == id)
        if (!user) {
            return res.status(404).end()
        }

        if (!req.body) {
            return res.status(400).end()
        }

        let userIndex = copyUsers.findIndex(user => user.id == id);
        copyUsers[userIndex] = { id: id, ...req.body };

        fs.writeFile(__dirname + "/users.json", JSON.stringify(copyUsers), () => {
            res.status(200).json({ "data": copyUsers[userIndex] })
        })

    })
    .delete((req, res) => {
        const id = req.params.id;

        const user = users.find(user => user.id == id)

        if (!user) {
            return res.status(404).end()
        }

        const filteredUsers = users.filter((user) => user.id != id);

        fs.writeFile(__dirname + "/users.json", JSON.stringify(filteredUsers), () => {
            res.status(204).end();
        }
        )

    })


app.listen(4040);