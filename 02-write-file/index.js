const fs = require('fs');
const path = require('node:path');
const readline = require('node:readline');
const filePath = path.join(__dirname, "output.txt");

const fileStream = fs.createWriteStream(filePath, { flags: "a" });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Enter text to write to file. Type "exit" to quit.');

const handleInput = (input) => {
    if(input.trim() === "exit") {
        console.log("Goodbye");
        rl.close();
    } else {
        fileStream.write(input + '\n');
    }
};

rl.on("line", handleInput);

rl.on("SIGINT", () => {
    console.log("\nGoodbye!");
    rl.close();
});