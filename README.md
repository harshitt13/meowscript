# 🐱 MeowScript Interpreter

MeowScript is a **fun and simple** programming language with cat-themed syntax! This is an interpreter for MeowScript, built using JavaScript.

## 🎉 Features
- 📝 **Variable assignments** (`x = 5`)
- 📢 **Printing output** (`meow("Hello, World!")`)
- 🔄 **Loops** (`while (condition) { ... }`)
- 🤔 **Conditionals** (`if (condition) { ... }`)
- ⏳ **Delays** (`catnap(seconds)`)
- 🐾 **Error handling** (`try { ... } scratch { ... }`)
- 🐱 **Cat-themed syntax!**

---

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/MeowScript.git
cd MeowScript
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the Interpreter
```js
const MeowScriptInterpreter = require("./interpreter.js");

const interpreter = new MeowScriptInterpreter();
const code = `
~ purr purr This is a comment
x = 5
y = 10
z = x + y
meow("The sum is: " + z)

if (z > 10) {
  meow("😺 " + z + " is greater than 10!")
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
}`;

interpreter.execute(code).then(output => console.log(output));
```

### 🎯 Expected Output
```
The sum is: 15
😺 15 is greater than 10!
😸 Purring...
z is now: 17
z is now: 19
z is now: 21
z is now: 23
Error: undefinedVar is not defined
Caught an error! 😼
```

---

## 🎨 MeowScript Syntax
### 🐾 Print Statements
```meowscript
meow("Hello, MeowScript!")
```

### 🐾 Variables
```meowscript
x = 42
y = x + 8
```

### 🐾 Conditional Statements
```meowscript
if (x > 40) {
  meow("x is big!")
}
```

### 🐾 Loops
```meowscript
while (x < 50) {
  x = x + 1
  meow("x is now: " + x)
}
```

### 🐾 Error Handling
```meowscript
try {
  meow(undefinedVar)
} scratch {
  meow("Caught an error! 😼")
}
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 📬 Contributing
Pull requests and suggestions are welcome! If you find any **bugs** or have **ideas**, feel free to open an issue. 🐾

---

## ⭐ Show Some Love!
If you like MeowScript, give it a **star** ⭐ on GitHub! 😺