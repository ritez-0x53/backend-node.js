
// Event module in node : core module that enables an object to emit named events and register listeners for those events. It plays a critical role in Node's asynchronous and non-blocking architecture.

// Node.js is event-driven by nature — most of its core features (like HTTP servers, file streams, etc.) rely on events.

// Helps you build loosely coupled components — instead of calling functions directly, one part emits an event, and other parts listen.

// Ideal for asynchronous programming, such as responding to user input, file loading, or server requests.

const EventEmitter = require("node:events");

// creating an emitter object uding EventEmitter class.
const emitter = new EventEmitter();

// can register a listener using .on() or .addListener()
emitter.on("greet", (args) => {
    console.log("greet listener")
    console.log(args)
})

// trigger the event using .emit()
emitter.emit("greet", { name: "ritez", role: "developer" });
emitter.emit("greet", { name: "sofiya", role: "foa" });

// One-time Listeners using once()
emitter.once("oneTime", (args) => {
    console.log("this is one time listener...")
})

emitter.emit("oneTime") // this will run
emitter.emit("oneTime") // will not run
emitter.emit("oneTime") // will not run

// removing listener using off
function sum() {
    console.log(10 + 20)
}
emitter.on("run", sum)
emitter.off("run", sum)
emitter.emit("run"); // not run...

// Real-world Use Case Example: HTTP Server
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received');
    res.end('Hello from server!');
});
server.listen(3000);

/*
✅ Why You Should Learn It
* Essential for backend dev with Node.js
* Better control over async flows
* Helps decouple code, making it more modular and scalable
*/