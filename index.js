import readline from "readline";
import { homedir } from "os";
import * as Constants from "./src/constants.js";
import { parseArgumentsWithEqualSign } from "./src/parseArguments.js";
import { up as commandUp } from "./src/commands/up.js";
import { ls as commandLs } from "./src/commands/ls.js";
import { cd as commandCd } from "./src/commands/cd.js";
import { cat as commandCat } from "./src/commands/cat.js";
import { add as commandAdd } from "./src/commands/add.js";
import { rn as commandRn } from "./src/commands/rn.js";
import { cp as commandCp } from "./src/commands/cp.js";
import { mv as commandMv } from "./src/commands/mv.js";
import { rm as commandRm } from "./src/commands/rm.js";
import { os as commandOs } from "./src/commands/os.js";
import { hash as commandHash } from "./src/commands/hash.js";
import { compress as commandCompress } from "./src/commands/compress.js";
import { decompress as commandDecompress } from "./src/commands/decompress.js";

const userName = parseArgumentsWithEqualSign("username");
let currentDirectory = homedir();

const commandUpSideEffect = (args) => {
  currentDirectory = commandUp(args);
};

const commandCdSideEffect = async (args) => {
  currentDirectory = await commandCd(args);
};

const knownCommands = {
  up: commandUpSideEffect,
  cd: commandCdSideEffect,
  ls: commandLs,
  cat: commandCat,
  add: commandAdd,
  rn: commandRn,
  cp: commandCp,
  mv: commandMv,
  rm: commandRm,
  os: commandOs,
  hash: commandHash,
  compress: commandCompress,
  decompress: commandDecompress,
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
    try {
      await commandFunction([currentDirectory, ...args]);
      printDirectory(currentDirectory);
    } catch (error) {
      console.log(Constants.operationFailed);
    }
  }
}

rl.on("SIGINT", () => {
  console.log(Constants.goodbye(userName));
  rl.close();
});

function printDirectory(path) {
  console.log(Constants.youAreInPath(path));
}
