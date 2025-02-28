import { useState } from "react";

export default function Playground() {
  const [code, setCode] = useState("meow('Hello, world!')");
  const [output, setOutput] = useState("🐾 MeowScript Output 🐾\n");

  const runCode = async () => {
    try {
      const response = await fetch(
        "https://meowscript-backend.vercel.app/run",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();
      setOutput(`🐾 MeowScript Output 🐾\n${data.output || data.error}`);
    } catch (err) {
      setOutput("🐾 Error: Unable to connect to the server 🐾");
    }
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={runCode}>Run MeowScript 🐾</button>
      <pre>{output}</pre>
    </div>
  );
}
