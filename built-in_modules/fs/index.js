
const fs = require("node:fs");
const fsPromise = require("node:fs/promises")

console.log(fsPromise);

// synchronous - not recommende for server.
function syncCode() {
    console.log("start....")
    fs.writeFileSync("file_1.txt", "This is first file");
    let res = fs.readFileSync("file_1.txt", "utf-8");
    console.log(res);
    fs.appendFileSync("file_1.txt", "\n next line text")
    res = fs.readFileSync("file_1.txt", "utf-8");
    console.log(res);
    console.log("end ....");
}
// syncCode()

function asyncCode() {
    console.log("start");

    fs.writeFile("filex.txt", "Some file text", (err) => {
        if (err) {throw err}
        fs.readFile("filex.txt" , "utf8" , (err,dat)=> {
            if(err) {throw err}
            console.log(dat);
            fs.appendFile("filex.txt", "\nnext line",  (err)=> {
                if(err) {throw err}
                console.log("appended..")
                fs.unlink("filex.txt" ,(err) => {
                    if(err) {throw err}
                    console.log("success")
                } )
            })
        })
    })
}

// asyncCode()


// 📁 5. Creating and Deleting Folders

function createFolder(folder){
    fs.mkdir(folder , (err)=> {
        if(err){throw err}
        console.log("folder created" , folder)
    })
}

function removeFolder(folder){
    fs.rmdirSync(folder);
    console.log("deleted successfully");
}

// createFolder("data");
// removeFolder("data");

// fs.mkdir(`${__dirname}/hello` , (err)=> {
//     console.log("created folder")
// })

// fs.rmdir(`${__dirname}/data` , (err)=> {
//     if(err) {throw err}
//     console.log("removed successfully");
// })

fs.rename(`${__dirname}/hello` , `${__dirname}/hellox` , (err)=> {
    console.log("done");
})

console.log(fs);