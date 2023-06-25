import readline from "readline";
import * as Constants from "./src/constants.js";
import { parseArgumentsWithEqualSign } from "./src/parseArguments.js";
import { up as commandUp } from "./src/commands/up.js";

const userName = parseArgumentsWithEqualSign("username");
let currentDirectory = process.env["HOME"];

const upWithDefaultArguments = (_) => {
  currentDirectory = commandUp(currentDirectory);
};

const knownCommands = {
  up: upWithDefaultArguments,
  cd: upWithDefaultArguments,
  ls: upWithDefaultArguments,
  cat: upWithDefaultArguments,
  add: upWithDefaultArguments,
  rn: upWithDefaultArguments,
  cp: upWithDefaultArguments,
  mv: upWithDefaultArguments,
  rm: upWithDefaultArguments,
  os: upWithDefaultArguments,
  hash: upWithDefaultArguments,
};

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
  const foundCommand = command in knownCommands;

  if (!foundCommand) {
    console.log(Constants.invalidInput);
  } else {
    let commandFunction = knownCommands[command];
    commandFunction(args);

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
