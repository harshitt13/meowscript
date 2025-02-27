class MeowScriptInterpreter {
  constructor() {
    this.variables = {};
    this.output = [];
  }

  async execute(code) {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line);
    let i = 0;
    while (i < lines.length) {
      i = await this.runLine(lines[i], lines, i);
    }
    return this.output.join(" "); // Ensure proper formatting
  }

  async runLine(line, lines, index) {
    if (!line || line.startsWith("~ purr purr")) {
      return index + 1; // Ignore comments
    }

    try {
      if (line.startsWith("meow(")) {
        const match = line.match(/meow\((.*)\)/);
        if (match) {
          const result = eval(this.replaceVars(match[1]));
          this.output.push(result.toString()); // Store output correctly
        }
      } else if (line.includes("=")) {
        const [key, value] = line.split("=").map(s => s.trim());
        this.variables[key] = eval(this.replaceVars(value));
      } else if (line.startsWith("purr()")) {
        this.output.push("😸 Purring...");
      } else if (line.startsWith("catnap(")) {
        const timeMatch = line.match(/catnap\((\d+)\)/);
        if (timeMatch) {
          const delay = parseInt(timeMatch[1]) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay)); // Non-blocking sleep
        }
      } else if (line.startsWith("if")) {
        return this.handleIfBlock(lines, index);
      } else if (line.startsWith("while")) {
        return this.handleWhileLoop(lines, index);
      } else if (line.startsWith("try")) {
        return this.handleTryCatch(lines, index);
      }
    } catch (error) {
      this.output.push(`Error: ${error.message}`);
    }
    return index + 1;
  }

  handleIfBlock(lines, index) {
    const conditionMatch = lines[index].match(/if\s*\((.*)\)\s*\{/);
    if (conditionMatch) {
      const conditionResult = eval(this.replaceVars(conditionMatch[1]));
      if (!conditionResult) {
        while (index < lines.length && !lines[index].trim().startsWith("}")) {
          index++;
        }
      }
    }
    return index + 1;
  }

  async handleWhileLoop(lines, index) {
    const conditionMatch = lines[index].match(/while\s*\((.*)\)\s*\{/);
    if (conditionMatch) {
      const loopStart = index;
      const loopBlock = [];
      index++;

      while (index < lines.length && !lines[index].trim().startsWith("}")) {
        loopBlock.push(lines[index].trim());
        index++;
      }

      while (eval(this.replaceVars(conditionMatch[1]))) {
        for (const cmd of loopBlock) {
          await this.runLine(cmd, lines, loopStart);
        }
      }
    }
    return index + 1;
  }

  async handleTryCatch(lines, index) {
    const block = [], catchBlock = [];
    let catching = false;
    index++;
    while (index < lines.length) {
      const currentLine = lines[index].trim();
      if (currentLine.startsWith("scratch")) {
        catching = true;
        index++;
        continue;
      }
      if (currentLine.startsWith("}")) break;
      if (catching) catchBlock.push(currentLine);
      else block.push(currentLine);
      index++;
    }

    try {
      for (const cmd of block) {
        await this.runLine(cmd, lines, index);
      }
    } catch (e) {
      for (const cmd of catchBlock) {
        await this.runLine(cmd.replace("e", JSON.stringify(e)), lines, index);
      }
    }
    return index + 1;
  }

  replaceVars(expression) {
    return expression.replace(/\b[a-zA-Z_]\w*\b/g, match => {
      return this.variables.hasOwnProperty(match) ? this.variables[match] : match;
    });
  }
}

module.exports = MeowScriptInterpreter;
