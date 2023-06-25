import readline from "readline";
import { homedir } from "os";
import * as Constants from "./src/constants.js";
import { parseArgumentsWithEqualSign } from "./src/parseArguments.js";
import { up as commandUp } from "./src/commands/up.js";
import { ls as commandLs } from "./src/commands/ls.js";

const userName = parseArgumentsWithEqualSign("username");
let currentDirectory = homedir();

const commandUpSideEffect = (args) => {
  currentDirectory = commandUp(args);
};

const knownCommands = {
  up: commandUpSideEffect,
  cd: commandUpSideEffect,
  ls: commandLs,
  cat: commandUpSideEffect,
  add: commandUpSideEffect,
  rn: commandUpSideEffect,
  cp: commandUpSideEffect,
  mv: commandUpSideEffect,
  rm: commandUpSideEffect,
  os: commandUpSideEffect,
  hash: commandUpSideEffect,
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

async function handleCommand(line) {
  const [command, ...args] = line.split(" ");
  const foundCommand = command in knownCommands;

  if (!foundCommand) {
    console.log(Constants.invalidInput);
  } else {
    let commandFunction = knownCommands[command];
    await commandFunction([currentDirectory, ...args]);
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
