const MeowScriptInterpreter = require("./interpreter");

const interpreter = new MeowScriptInterpreter();

const code = `
~ purr purr This is a comment
x = 5
y = 10
z = x + y
meow("The sum is: " + z)

if (z > 10) {
    meow("😺 z is greater than 10!")
}

purr()

while (z < 20) {
    z = z + 2
    meow("z is now: " + z)
}

try {
    meow(undefinedVar)  // This should throw an error
} scratch {
    meow("Caught an error! 😼")
}
`;

console.log("🐱 Running MeowScript...");
const output = interpreter.execute(code);
console.log("🐾 Output:");
console.log(output);
