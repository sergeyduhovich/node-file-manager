import { dirname } from "path";

const up = (args) => {
  const currentDirectory = args[0];
  return dirname(currentDirectory);
};

export { up };
