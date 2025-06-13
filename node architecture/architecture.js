
const fs = require("node:fs");
const start = Date.now();
const crypto = require("node:crypto");

process.env.UV_THREADPO0L_SIZE = 2

// i/o poll task ---> thread poll (Event loop of libuv)
fs.readFile("./data.html" , "utf-8" , (err,data)=> {
    console.log("I/O poll task - reading file.." );
    setTimeout(()=> {console.log("timer fn under i/o poll 3s")},3000)
    setTimeout(()=> {console.log("timer fn under i/o poll 0s")})
    setImmediate(()=> {console.log("Immediate fn under i/o poll")})

    crypto.pbkdf2("xyz123" ,"salt1" , 100000 , 1024 , "sha512" , ()=> {
      console.log("thread poll work 1" ,(Date.now() -  start)*1000,"sec");
    })

    crypto.pbkdf2("xyz123" ,"salt1" , 100000 , 1024 , "sha512" , ()=> {
      console.log("thread poll work 2" ,Date.now() -  start);
    })

    crypto.pbkdf2("xyz123" ,"salt1" , 100000 , 1024 , "sha512" , ()=> {
      console.log("thread poll work 3" ,Date.now() -  start);
    })

    crypto.pbkdf2("xyz123" ,"salt1" , 100000 , 1024 , "sha512" , ()=> {
      console.log("thread poll work 4" ,Date.now() -  start);
    })

    crypto.pbkdf2("xyz123" ,"salt1" , 100000 , 1024 , "sha512" , ()=> {
      console.log("thread poll work 5" ,Date.now() -  start);
    })

    crypto.pbkdf2("xyz123" ,"salt1" , 100000 , 1024 , "sha512" , ()=> {
      console.log("thread poll work 6" ,Date.now() -  start);
    })

    
}); 

// check phase task ---> check queue (Event loop of libuv)
setImmediate(()=> {console.log("runnging check phase code - setImmediate")} )

// timer phase ---> timer queue (Event loop of libuv)
setTimeout(()=> {console.log("running timer code of delay 0s")},0)
setTimeout(()=> {console.log("running timer code of delay 3s")},3000)


//top level microtask ---> microtask queue (callstack of v8)
Promise.resolve().then(() => {
    console.log("top level Microtask");
  });
  

// top level code --> synchronous code. (call stack of v8)
console.log("top level code")


