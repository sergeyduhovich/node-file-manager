import { isAbsolute, join } from "path";
import { stat } from "fs/promises";

const cd = async (args) => {
  const currentDirectory = args[0];
  if (args.length < 2) {
    throw new Error("cd must have 1 parameter");
  }
  let dirToNavigate = args[1];
  let absoluteDirPath;

  if (isAbsolute(dirToNavigate)) {
    absoluteDirPath = dirToNavigate;
  } else {
    absoluteDirPath = join(currentDirectory, dirToNavigate);
  }

  try {
    const pathStats = await stat(absoluteDirPath);
    if (!pathStats.isDirectory()) {
      throw new Error("cd parameter must be a directory");
    }

    return absoluteDirPath;
  } catch (error) {
    throw new Error("path doesn't exist");
  }
};

export { cd };
