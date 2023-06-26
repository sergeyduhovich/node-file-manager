import { readdir, stat } from "fs/promises";
import { join } from "path";

const ls = async (args) => {
  const currentDirectory = args[0];
  const files = await readdir(currentDirectory);
  const filesToLog = [];

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

      filesToLog.push({ Name: fileName, Type: type });
    } catch (error) {}
  }

  filesToLog.sort((a, b) => {
    if (a.Type !== b.Type) {
      return a.Type === "directory" ? -1 : 1;
    }
    return a.Name.localeCompare(b.Name);
  });

  console.table(filesToLog);
};

export { ls };
