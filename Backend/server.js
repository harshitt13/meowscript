const express = require("express");
const cors = require("cors");
const MeowScriptInterpreter = require("./interpreter");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run", async (req, res) => {
    const { code } = req.body;
    const interpreter = new MeowScriptInterpreter();
    const output = await interpreter.execute(code);
    res.json({ output });
});

app.listen(5000, () => console.log("MeowScript server running on port 5000!"));
