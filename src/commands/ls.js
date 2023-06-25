import { readdir, stat } from "fs/promises";
import { join } from "path";

const ls = async (args) => {
  const currentDirectory = args[0];
  const files = await readdir(currentDirectory);
  const filesTable = {};

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    let fullPathToFile = join(currentDirectory, fileName);
    try {
      const pathStats = await stat(fullPathToFile);
      let type;
      if (pathStats.isDirectory()) {
        type = "directory";
      } else if (pathStats.isFile()) {
        type = "file";
      }
      filesTable[i] = { Name: fileName, Type: type };
    } catch (error) {}
  }

  console.table(filesTable, ["Name", "Type"]);
};

export { ls };
