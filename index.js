import readline from "readline";
import * as Constants from "./src/constants.js";

const userName = "UserName";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

console.log(Constants.greeting(userName));

printCurrentDirectory();

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
  console.log(`command is ${command}\n arguments are ${args}`);
}

rl.on("SIGINT", () => {
  console.log(Constants.goodbye(userName));
  rl.close();
});

function printCurrentDirectory() {
  console.log(Constants.youAreInPath(process.cwd()));
}
