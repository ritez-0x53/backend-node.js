
const {Writable , Readable} = require("stream");
console.log(Writable)

const readable = new Readable({
    read: {},
    highWaterMark : 2
})
