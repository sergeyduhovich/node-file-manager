import * as nodeOS from "os";

const knownCommands = ["--EOL", "--cpus", "--homedir", "--username", "--architecture"];

const os = async (args) => {
  if (args.length < 2) {
    throw new Error("os must have 1 parameter");
  }
  const passedArgument = args[1];
  const foundCommand = knownCommands.includes(passedArgument);
  if (!foundCommand) {
    throw new Error("OS command not found");
  }

  switch (passedArgument) {
    case "--EOL":
      console.log(nodeOS.EOL);
      break;
    case "--cpus":
      console.log(cpusInfo());
      break;
    case "--homedir":
      console.log(nodeOS.homedir());
      break;
    case "--username":
      console.log(nodeOS.userInfo().username);
      break;
    case "--architecture":
      console.log(nodeOS.arch());
      break;
    default:
      break;
  }
};

const cpusInfo = () => {
  return nodeOS.cpus().map((cpu) => {
    return {
      model: cpu.model,
      speed: cpu.speed,
    };
  });
};

export { os };
