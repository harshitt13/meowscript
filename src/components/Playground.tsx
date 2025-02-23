import { useState } from 'react';

export default function Playground() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    const response = await fetch('/api/execute', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    setOutput(result.output);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🐱 MeowScript Playground</h1>
      <textarea
        className="w-full h-48 p-2 border rounded mb-4"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your MeowScript code here..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={runCode}
      >
        Run
      </button>
      <pre className="mt-4 p-2 bg-gray-100 rounded">{output}</pre>
    </div>
  );
}