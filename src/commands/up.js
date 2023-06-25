import { dirname } from "path";

const up = (currentDirectory) => {
  return dirname(currentDirectory);
};

export { up };
