import React, { useState } from "react";
import "./styles.css";
import Documentation from "./components/Documentation";

export default function App() {
  const [code, setCode] = useState("meow('Hello, world!')");
  const [output, setOutput] = useState("");

  const runMeowScript = async () => {
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
      setOutput(data.output);
    } catch (error) {
      setOutput("Error: Unable to connect to backend");
    }
  };

  return (
    <div className="container">
      {/* Wrapped title and subtitle inside a white box */}
      <div className="header-container">
        <h1 className="title">
          🐱 MeowScript: The Purrfect Programming Language! 🐱
        </h1>
        <p className="subtitle">
          MeowScript is a fun language for cat lovers! 🐾
        </p>
      </div>

      <div className="playground">
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="run-btn" onClick={runMeowScript}>
          Run MeowScript 🐾
        </button>
        <div className="output">
          {output || "🐾 Output will appear here 🐾"}
        </div>
      </div>

      <Documentation />

      {/* GitHub Link */}
      <div className="github-link">
        <a
          href="https://github.com/harshitt13/meowscript"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github-icon.png" alt="GitHub" className="github-icon" />
        </a>
      </div>
    </div>
  );
}
