export default function Documentation() {
  return (
    <div className="documentation-container">
      <h2>📜 MeowScript Documentation 📜</h2>
      <p>MeowScript is a fun, cat-themed scripting language! Here's how to use it:</p>
      <ul>
        <li>
          <strong>Purring as comments:</strong> <br />
          <span className="code">{"~ purr purr this is a comment ~"}</span><br />
          <em>Use comments to annotate your code.</em>
        </li>
        <li>
          <strong>Printing:</strong> <br />
          <span className="code">{"meow('Hello!')"}</span><br />
          <em>Displays text on the screen.</em>
        </li>
        <li>
          <strong>Delays:</strong> <br />
          <span className="code">{"catnap(5)"}</span><br />
          <em>Pauses execution for 5 seconds.</em>
        </li>
        <li>
          <strong>Conditions:</strong> <br />
          <span className="code">{"if (hungry) { meow('Feed me!') }"}</span><br />
          <em>Executes code if the condition is true.</em>
        </li>
        <li>
          <strong>Loops:</strong> <br />
          <span className="code">{"while (hungry) { meow('Meow!') }"}</span><br />
          <em>Repeats a block of code while the condition is true.</em>
        </li>
        <li>
          <strong>Error Handling:</strong> <br />
          <span className="code">{"try { climb(tree) } scratch (e) { meow('Ouch!') }"}</span><br />
          <em>Catches and handles errors.</em>
        </li>
      </ul>
    </div>
  );
}
