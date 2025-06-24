
const express = require("express");

const app = express();
const employeeRouter = require("./routes/employeeRoutes");

app.use("/employee" , employeeRouter);

app.listen(8080 , ()=> {
    console.log("running server on port 8080");
});