const express = require("express");
const cors = require("cors");
const MeowScriptInterpreter = require("./interpreter");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ test: "test" });
});

app.post("/run", async (req, res) => {
  const { code } = req.body;
  const interpreter = new MeowScriptInterpreter();
  const output = await interpreter.execute(code);
  res.json({ output });
});

app.listen(80, () => console.log("MeowScript server running on port 80!"));
