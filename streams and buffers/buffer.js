
// A Buffer is a temporary memory chunk that holds binary data.

// When reading a file, the data is not directly in strings — it's first in binary (0s and 1s). A buffer stores this binary data before converting it.

// 🔹 Key Points:
// Stores raw binary data
// Helps with data manipulation before it's ready for output
// Used under the hood in many Node.js I/O operations

const string = "Hello, How are you, How you doing !"
const buffer = Buffer.from(string);

console.log(buffer )
console.log(buffer.toString());

