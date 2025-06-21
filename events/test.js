"use strict";

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("registered" , (args)=> {
    console.log("registered successfully, Welcome to the group, "+args.name)
})

function welcomeKit(args){
    console.log(`"Welcome aboard, ${args.name}!"`)
}

eventEmitter.on("registered" , welcomeKit)

function registerUser(name){
    eventEmitter.emit("registered" , {name : name});
}

// listener that run only once.
eventEmitter.once("registered" ,(args)=> {
    console.log("Welcome our first guest, "+args.name)
})

// removing welcome kit listener 
eventEmitter.off("registered" , welcomeKit)

registerUser("Riteswar");
registerUser("Suhani");
registerUser("Minakshi");
registerUser("Gaurav");
registerUser("Sofiya");

