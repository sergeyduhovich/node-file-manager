import readline from "readline";
import * as Constants from "./src/constants.js";
import { parseArgumentsWithEqualSign } from "./src/parseArguments.js";

const userName = parseArgumentsWithEqualSign("username");
let currentDirectory = process.env["HOME"];

const knownCommands = ["up", "cd", "ls", "cat", "add", "rn", "cp", "mv", "rm", "os", "hash"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

console.log(Constants.greeting(userName));

printDirectory(currentDirectory);

rl.prompt();

rl.on("line", (line) => {
  line = line.trim();

  if (line === ".exit") {
    console.log(Constants.goodbye(userName));
    rl.close();
    return;
  }

  handleCommand(line);

  rl.prompt();
});

function handleCommand(line) {
  const [command, ...args] = line.split(" ");

  const foundCommand = knownCommands.find((item) => item === command);

  if (!foundCommand) {
    console.log(Constants.invalidInput);
  } else {
    console.log(`command is ${command}\n arguments are ${args}`);
    printDirectory(currentDirectory);
  }
}

rl.on("SIGINT", () => {
  console.log(Constants.goodbye(userName));
  rl.close();
});

function printDirectory(path) {
  console.log(Constants.youAreInPath(path));
}
