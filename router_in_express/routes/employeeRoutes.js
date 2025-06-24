const { Router } = require("express");

const employeeRouter = Router();

employeeRouter.use((req,res,next)=> {
    
    if(req.query.admin == "true") {
        next()
    } else {
        return res.status(403).end("forbidden")
    }

})

employeeRouter.get("/" , (req,res)=> {
    res.end("employee router...")
})


module.exports = employeeRouter;
